import { useEffect, useState } from "react";
import {
  getPendingPayments,
  confirmPayment,
  rejectPayment,
} from "../../api/paymentApi";

function PaymentApproval() {
  const [payments, setPayments] = useState<any[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const load = async () => {
    const res = await getPendingPayments();
    setPayments(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const handleConfirm = async (id: string) => {
    await confirmPayment(id);
    alert("Payment confirmed");
    load();
  };

  const handleReject = async (id: string) => {
    const reason = reasons[id];

    await rejectPayment(id, reason || "Invalid payment");
    alert("Payment rejected");

    
    setReasons((prev) => ({ ...prev, [id]: "" }));

    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Pending Payment Confirmations
      </h2>

      {payments.map((p) => (
        <div key={p.id} className="border p-4 mb-3 rounded">
          <p>Amount: ₦{p.amount}</p>
          <p>Method: {p.paymentMethod}</p>

          <input
            className="border p-2 w-full mt-2"
            placeholder="Rejection reason..."
            value={reasons[p.id] || ""}
            onChange={(e) =>
              setReasons({ ...reasons, [p.id]: e.target.value })
            }
          />

          <div className="mt-2">
            <button
              onClick={() => handleConfirm(p.id)}
              className="bg-green-600 text-white px-3 py-1 mr-2"
            >
              Confirm
            </button>

            <button
              onClick={() => handleReject(p.id)}
              className="bg-red-600 text-white px-3 py-1"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PaymentApproval;