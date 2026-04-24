import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LeaseDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [lease, setLease] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchLease = async () => {
    try {
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Leases/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setSchedules(data.data || []);
    } catch (err) {
      console.error("Schedule fetch error:", err);
    } finally {
      setLoading(false);
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
          amount: amount,
          paymentMethod: "Manual",
          transactionReference: "MANUAL-" + Date.now(),
          notes: "Paid from system",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment recorded successfully");
        fetchSchedules(); // refresh
      } else {
        alert(data.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLease();
      fetchSchedules();
    }
  }, [id]);

  if (loading) {
    return <p className="p-6">Loading lease...</p>;
  }

  if (!lease) {
    return <p className="p-6">Lease not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">


      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold">{lease.propertyTitle}</h1>
        <p className="text-gray-600">{lease.propertyAddress}</p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><b>Tenant:</b> {lease.tenantName}</p>
          <p><b>Email:</b> {lease.tenantEmail}</p>
          <p><b>Rent:</b> ₦{lease.rentAmount}</p>
          <p><b>Status:</b> {lease.status}</p>
        </div>
      </div>


      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Rent Schedule</h2>

        {schedules.length === 0 ? (
          <p>No payment schedule available</p>
        ) : (
          schedules.map((s) => (
            <div
              key={s.id}
              className="border p-4 rounded mb-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  Due: {new Date(s.dueDate).toDateString()}
                </p>
                <p>Amount: ₦{s.amountDue}</p>
                <p>Status: {s.status}</p>
              </div>

              <button
                onClick={() => recordPayment(s.id, s.amountDue)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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