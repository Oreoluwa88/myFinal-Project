import { useEffect, useState } from "react";

function PaymentConfirmation() {
  const token = localStorage.getItem("token");
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await fetch(
      "https://propms-api.fly.dev/api/v1/Payments/pending-confirmation",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setPayments(data.data || []);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const confirm = async (id: string) => {
    await fetch(
      `https://propms-api.fly.dev/api/v1/Payments/${id}/confirm`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchPayments();
  };

  const reject = async (id: string) => {
    await fetch(
      `https://propms-api.fly.dev/api/v1/Payments/${id}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: "Rejected by admin" }),
      }
    );

    fetchPayments();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold text-lg mb-4">
        Pending Payment Confirmations
      </h2>

      {payments.length === 0 ? (
        <p>No pending payments</p>
      ) : (
        payments.map((p: any) => (
          <div key={p.id} className="border p-3 mb-3 rounded">
            <p><b>Amount:</b> ₦{p.amount}</p>
            <p><b>Method:</b> {p.paymentMethod}</p>
            <p><b>Status:</b> {p.status}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => confirm(p.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => reject(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PaymentConfirmation;