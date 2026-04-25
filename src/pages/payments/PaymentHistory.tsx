import { useEffect, useState } from "react";
import "./PaymentHistory.css";

function PaymentHistory() {
  const token = localStorage.getItem("token");

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Payments/history/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setHistory(data.data || []);
      } catch (err) {
        console.error("Failed to load payment history:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div className="tenant-history-loading">Loading history...</div>;
  }

  return (
    <div className="tenant-history-page">

      <h2 className="tenant-history-title">Payment History</h2>

      {history.length === 0 ? (
        <p className="tenant-history-empty">No payment history found</p>
      ) : (
        <div className="tenant-history-grid">

          {history.map((p) => (
            <div key={p.id} className="tenant-history-card">

              <div className="tenant-history-header">
                <h3>Payment</h3>
                <span className={`tenant-history-status ${p.status?.toLowerCase()}`}>
                  {p.status}
                </span>
              </div>

              <div className="tenant-history-body">

                <p>
                  <b>Amount:</b> ₦{p.amount}
                </p>

                <p>
                  <b>Method:</b> {p.paymentMethod}
                </p>

                <p>
                  <b>Reference:</b> {p.transactionReference}
                </p>

                <p>
                  <b>Date:</b>{" "}
                  {p.paymentDate
                    ? new Date(p.paymentDate).toDateString()
                    : "N/A"}
                </p>

                <p>
                  <b>Paid By:</b> {p.paidByName}
                </p>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default PaymentHistory;