import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LeaseDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [lease, setLease] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(true);

  const fetchLease = async () => {
    try {
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Leases/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setLease(data.data);
    } catch (err) {
      console.error("Lease fetch error:", err);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Payments/schedules/lease/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setSchedules(data.data || []);
    } catch (err) {
      console.error("Schedule fetch error:", err);
    } finally {
      setLoadingSchedules(false);
    }
  };

  const recordPayment = async (scheduleId: string, amount: number) => {
    try {
      const res = await fetch("https://propms-api.fly.dev/api/v1/Payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rentScheduleId: scheduleId,
          amount,
          paymentMethod: "Manual",
          transactionReference: "MANUAL-" + Date.now(),
          notes: "Paid from system",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment recorded");
        fetchSchedules();
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setLoading(true);
      await fetchLease();
      await fetchSchedules();
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) {
    return <div className="lease-loading">Loading lease...</div>;
  }

  if (!lease) {
    return <div className="lease-empty">Lease not found</div>;
  }

  return (
    <div className="lease-details-page">

      <div className="lease-card">
        <h1 className="lease-title">{lease.propertyTitle}</h1>
        <p className="lease-address">{lease.propertyAddress}</p>

        <div className="lease-info-grid">
          <div>
            <span>Tenant</span>
            <p>{lease.tenantName}</p>
          </div>

          <div>
            <span>Email</span>
            <p>{lease.tenantEmail}</p>
          </div>

          <div>
            <span>Rent</span>
            <p>₦{lease.rentAmount}</p>
          </div>

          <div>
            <span>Status</span>
            <p>{lease.status}</p>
          </div>
        </div>
      </div>
      <div className="schedule-card">
        <h2>Rent Schedule</h2>

        {loadingSchedules ? (
          <p>Loading schedules...</p>
        ) : schedules.length === 0 ? (
          <p>No payment schedule available</p>
        ) : (
          schedules.map((s) => (
            <div key={s.id} className="schedule-item">
              <div>
                <p className="due-date">
                  Due: {new Date(s.dueDate).toDateString()}
                </p>

                <p>Amount: ₦{s.amountDue}</p>
                <p>Status: {s.status}</p>
              </div>

              <button
                onClick={() => recordPayment(s.id, s.amountDue)}
                className="pay-btn"
              >
                Record Payment
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LeaseDetails;