import { useEffect, useState } from "react";
import "./TenantPayment.css";

function TenantPayment() {
  const token = localStorage.getItem("token");

  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Payments/schedules/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setSchedules(data.data || []);
      } catch (err) {
        console.error("Failed to load schedules:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handlePayment = async (schedule: any) => {
    try {
      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rentScheduleId: schedule.id,
            amount: schedule.amountDue,
            paymentMethod: "Manual",
            transactionReference: "TX-" + Date.now(),
            notes: "Tenant payment",
          }),
        }
      );

      const data = await res.json();

      alert(data.message || "Payment submitted");


      setSchedules((prev) =>
        prev.map((s) =>
          s.id === schedule.id
            ? { ...s, amountPaid: schedule.amountDue, status: "Pending" }
            : s
        )
      );
    } catch (err) {
      console.error("Payment failed:", err);
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
                <h3>Due Payment</h3>
                <span className={`tenant-payment-status ${s.status?.toLowerCase()}`}>
                  {s.status}
                </span>
              </div>

              <div className="tenant-payment-body">

                <p>
                  <b>Due Date:</b>{" "}
                  {new Date(s.dueDate).toDateString()}
                </p>

                <p>
                  <b>Amount:</b> ₦{s.amountDue}
                </p>

                <p>
                  <b>Paid:</b> ₦{s.amountPaid || 0}
                </p>

                <p>
                  <b>Balance:</b> ₦{s.balanceDue}
                </p>

              </div>

              <button
                className="tenant-pay-btn"
                onClick={() => handlePayment(s)}
                disabled={s.status === "Paid"}
              >
                Pay Now
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default TenantPayment;