import { useEffect, useState } from "react";

function Approvals() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // adjust if you store it differently

  // FETCH PENDING PROPERTIES
  const fetchPending = async () => {
    try {
      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Properties/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setPending(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approveProperty = async (id: string) => {
    await fetch(
      `https://propms-api.fly.dev/api/v1/Properties/${id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchPending();
  };

  const rejectProperty = async (id: string) => {
    const reason = prompt("Enter rejection reason:");

    await fetch(
      `https://propms-api.fly.dev/api/v1/Properties/${id}/reject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      }
    );

    fetchPending();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Pending Approvals</h2>

      {pending.length === 0 ? (
        <p>No pending properties</p>
      ) : (
        pending.map((p) => (
          <div key={p.id} style={{ marginBottom: "20px" }}>
            <img src={p.primaryImageUrl} width="200" />
            <h3>{p.title}</h3>
            <p>{p.location}</p>

            <button onClick={() => approveProperty(p.id)}>
              Approve
            </button>

            <button onClick={() => rejectProperty(p.id)}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Approvals;