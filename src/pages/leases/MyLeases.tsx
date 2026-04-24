import { useEffect, useState } from "react";

function MyLeases() {
  const token = localStorage.getItem("token");
  const [leases, setLeases] = useState([]);

  useEffect(() => {
    const fetchLeases = async () => {
      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Leases/my-leases",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setLeases(data.data || []);
    };

    fetchLeases();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Leases</h2>

      {leases.map((l: any) => (
        <div key={l.id} className="border p-4 mb-3 rounded">
          <p><b>Property:</b> {l.propertyTitle}</p>
          <p><b>Rent:</b> ₦{l.rentAmount}</p>
          <p><b>Status:</b> {l.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyLeases;