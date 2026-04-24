import { useEffect, useState } from "react";

function LandlordLeases() {
  const token = localStorage.getItem("token");
  const [leases, setLeases] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Leases/landlord-leases",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLeases(data.data || []);
    };

    fetchData();
  }, []);

  const terminateLease = async (id: string) => {
    await fetch(
      `https://propms-api.fly.dev/api/v1/Leases/${id}/terminate`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Lease terminated");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Landlord Leases</h1>

      <div className="grid gap-4">
        {leases.map((l) => (
          <div key={l.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold">{l.propertyTitle}</h2>
            <p>{l.tenantName}</p>
            <p>Status: {l.status}</p>

            <button
              onClick={() => terminateLease(l.id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Terminate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandlordLeases;