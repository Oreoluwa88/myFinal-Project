import { useEffect, useState } from "react";
import { getMyPaymentHistory } from "../../api/paymentApi";

function PaymentHistory() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await getMyPaymentHistory();
      setHistory(res.data || []);
    };

    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payment History</h2>

      {history.map((p) => (
        <div key={p.id} className="border p-4 mb-3 rounded">
          <p>Amount: ₦{p.amount}</p>
          <p>Status: {p.status}</p>
          <p>Method: {p.paymentMethod}</p>
          <p>Date: {new Date(p.paymentDate).toDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default PaymentHistory;