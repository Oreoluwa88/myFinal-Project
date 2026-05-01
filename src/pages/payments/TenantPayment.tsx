import { useEffect, useState } from "react";
import "./TenantPayment.css";

function TenantPayment() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    loadSchedules();
  }, [token]);

  const loadSchedules = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Payments/schedules/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      setSchedules(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Failed to load schedules:", err);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (schedule: any) => {
    if (!token) return;

    
    if (schedule.status === "Paid" || schedule.balanceDue <= 0) {
      alert("This payment is already completed");
      return;
    }

    try {
      setPayingId(schedule.id);

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Payments/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            rentScheduleId: schedule.id,
            amount: Number(schedule.balanceDue) * 100, // ✅ FIXED (kobo)
            callbackUrl: window.location.origin + "/payment/callback",
          }),
        }
      );

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        alert(data?.message || "Payment initialization failed");
        return;
      }

      const paymentUrl = data?.data?.authorizationUrl;

      if (!paymentUrl) {
        alert("No payment URL returned");
        return;
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment error occurred");
    } finally {
      setPayingId(null);
    }
  };

  if (loading) {
    return <div className="tenant-payment-loading">Loading payments...</div>;
  }

  return (
    <div className="tenant-payment-page">
      <h2 className="tenant-payment-title">My Rent Payments</h2>

      {schedules.length === 0 ? (
        <p className="tenant-payment-empty">
          No payment schedules available
        </p>
      ) : (
        <div className="tenant-payment-grid">
          {schedules.map((s) => (
            <div key={s.id} className="tenant-payment-card">
              <div className="tenant-payment-header">
                <h3>{s.propertyTitle || "Rent Payment"}</h3>

                <span
                  className={`tenant-payment-status ${s.status?.toLowerCase()}`}
                >
                  {s.status}
                </span>
              </div>

              <div className="tenant-payment-body">
                <p><b>Due Date:</b> {new Date(s.dueDate).toDateString()}</p>
                <p><b>Amount:</b> ₦{s.amountDue}</p>
                <p><b>Paid:</b> ₦{s.amountPaid || 0}</p>
                <p><b>Balance:</b> ₦{s.balanceDue}</p>
              </div>

              <button
                className="tenant-pay-btn"
                onClick={() => handlePayment(s)}
                disabled={
                  s.status === "Paid" ||
                  s.balanceDue <= 0 ||
                  payingId === s.id
                }
              >
                {payingId === s.id ? "Processing..." : "Pay Now"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TenantPayment;