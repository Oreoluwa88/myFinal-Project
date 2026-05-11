import { useEffect, useState } from "react";
import "./LandlordPaymentHistory.css";

function LandlordPaymentHistory() {
  const token = localStorage.getItem("token");

  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Payments/history/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      const list = Array.isArray(data?.data) ? data.data : [];
      setPayments(list);
    } catch (err) {
      console.error(err);
      setError("Failed to load payments");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const totalReceived = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const thisMonth = payments.filter((p) => {
    if (!p.paymentDate) return false;
    const d = new Date(p.paymentDate);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear() &&
      p.status === "Paid"
    );
  });

  const monthlyIncome = thisMonth.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  const formatDate = (d: string) =>
    d ? new Date(d).toDateString() : "N/A";

  if (loading) {
    return <div className="lp-loading">Loading payments...</div>;
  }

  return (
    <div className="lp-page">

      <h1 className="lp-title">Income & Payments</h1>

      {error && <p className="lp-error">{error}</p>}

      <div className="lp-cards">

        <div className="lp-card">
          <h4>Total Received</h4>
          <p>₦{totalReceived.toLocaleString()}</p>
        </div>

        <div className="lp-card">
          <h4>This Month</h4>
          <p>₦{monthlyIncome.toLocaleString()}</p>
        </div>

        <div className="lp-card">
          <h4>Pending</h4>
          <p>₦{pendingAmount.toLocaleString()}</p>
        </div>

      </div>

      {payments.length === 0 ? (
        <p className="lp-empty">No payments yet</p>
      ) : (
        <div className="lp-table-wrapper">
          <table className="lp-table">
            <thead>
              <tr>
                <th>Tenant</th>
                <th>Property</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Reference</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.paidByName || "N/A"}</td>
                  <td>{p.propertyTitle || "N/A"}</td>
                  <td>₦{(p.amount || 0).toLocaleString()}</td>
                  <td>
                    <span className={`lp-status ${p.status?.toLowerCase()}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>{formatDate(p.paymentDate)}</td>
                  <td>{p.transactionReference || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default LandlordPaymentHistory;