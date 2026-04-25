import { useEffect, useState } from "react";

function PaymentConfirmation() {
  const token = localStorage.getItem("token");
  const [payments, setPayments] = useState<any[]>([]);

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
    <div>
      <h2 className="text-lg font-bold mb-4">
        Pending Payment Confirmations
      </h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No pending payments</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {payments.map((p: any) => (
            <div
              key={p.id}
              className="bg-white border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <p className="text-sm">
                <span className="font-semibold">Amount:</span> ₦{p.amount}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Method:</span> {p.paymentMethod}
              </p>

              <p className="text-sm">
                <span className="font-semibold">Status:</span> {p.status}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => confirm(p.id)}
                  className="flex-1 bg-green-500 text-white text-xs py-2 rounded hover:bg-green-600"
                >
                  Confirm
                </button>

                <button
                  onClick={() => reject(p.id)}
                  className="flex-1 bg-red-500 text-white text-xs py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default PaymentConfirmation;