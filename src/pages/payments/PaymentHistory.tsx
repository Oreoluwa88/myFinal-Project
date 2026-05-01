import { useEffect, useState } from "react";
import "./PaymentHistory.css";

function PaymentHistory() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (!token) return;

    const load = async () => {
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
        let data: any = {};

        try {
          data = text ? JSON.parse(text) : {};
        } catch {
          data = {};
        }

        setHistory(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load payment history");
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [token]);

  const formatDate = (d: string) =>
    d ? new Date(d).toLocaleDateString() : "N/A";

  const downloadReceipt = (p: any) => {
    const win = window.open("", "_blank");
    if (!win) return;

    win.document.write(`
      <html>
        <head><title>Receipt</title></head>
        <body style="font-family: Arial; padding:20px;">
          <h2>Payment Receipt</h2>
          <hr />
          <p><b>Amount:</b> ₦${p.amount || 0}</p>
          <p><b>Status:</b> ${p.status}</p>
          <p><b>Method:</b> ${p.paymentMethod || "N/A"}</p>
          <p><b>Reference:</b> ${p.transactionReference || "N/A"}</p>
          <p><b>Date:</b> ${formatDate(p.paymentDate)}</p>
          <p><b>Paid By:</b> ${p.paidByName || "N/A"}</p>
          <hr />
          <small>Rentify</small>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  if (loading) return <div>Loading history...</div>;

  return (
    <div className="tenant-history-page">
      <h2 className="tenant-history-title">Payment History</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length === 0 ? (
        <p>No payment history found</p>
      ) : (
        <div className="tenant-history-grid">
          {history.map((p) => (
            <div key={p.id} className="tenant-history-card">
              <div className="tenant-history-header">
                <h3>{p.propertyTitle || "Payment"}</h3>

                <span
                  className={`tenant-history-status ${(
                    p.status || ""
                  ).toLowerCase()}`}
                >
                  {p.status || "UNKNOWN"}
                </span>
              </div>

              <div className="tenant-history-body">
                <p><b>Amount:</b> ₦{p.amount}</p>
                <p><b>Method:</b> {p.paymentMethod}</p>
                <p><b>Reference:</b> {p.transactionReference}</p>
                <p><b>Date:</b> {formatDate(p.paymentDate)}</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setSelected(p)}
                  style={{
                    padding: "6px 10px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>

                <button
                  onClick={() => downloadReceipt(p)}
                  style={{
                    padding: "6px 10px",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              width: 400,
            }}
          >
            <h3>Receipt</h3>

            <p><b>Amount:</b> ₦{selected.amount}</p>
            <p><b>Status:</b> {selected.status}</p>
            <p><b>Reference:</b> {selected.transactionReference}</p>
            <p><b>Date:</b> {formatDate(selected.paymentDate)}</p>

            <button
              onClick={() => setSelected(null)}
              style={{
                marginTop: 10,
                padding: "6px 10px",
                background: "red",
                color: "#fff",
                border: "none",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;