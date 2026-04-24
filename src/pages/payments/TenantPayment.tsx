import { useEffect, useState } from "react";
import { getLeaseSchedules, makePayment } from "../../api/paymentApi";

function TenantPayment() {
  const [leaseId, setLeaseId] = useState<string>("");
  const [schedules, setSchedules] = useState<any[]>([]);

  useEffect(() => {
    if (!leaseId) return;

    const load = async () => {
      const res = await getLeaseSchedules(leaseId);
      setSchedules(res.data || []);
    };

    load();
  }, [leaseId]);

  const handlePayment = async (schedule: any) => {
    const res = await makePayment({
      rentScheduleId: schedule.id,
      amount: schedule.amountDue,
      paymentMethod: "Manual",
      transactionReference: "TX-" + Date.now(),
      notes: "Tenant payment",
    });

    alert(res.message || "Payment submitted");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Make Payment</h2>

      <input
        className="border p-2 mb-4"
        placeholder="Enter Lease ID"
        value={leaseId}
        onChange={(e) => setLeaseId(e.target.value)}
      />

      {schedules.map((s) => (
        <div key={s.id} className="border p-4 mb-3 rounded">
          <p>Due: {new Date(s.dueDate).toDateString()}</p>
          <p>Amount: ₦{s.amountDue}</p>
          <p>Status: {s.status}</p>

          <button
            onClick={() => handlePayment(s)}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
          >
            Pay Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default TenantPayment;