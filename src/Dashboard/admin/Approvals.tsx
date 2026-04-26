import { useEffect, useState } from "react";
import Navbartwo from "../../components/Navbartwo";
import Navbarone from "../../components/Navbarone";
import { ChevronRight } from "lucide-react";

function Approvals() {
  const [pending, setPending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

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

  if (loading) {
    return <p className="text-gray-500">Loading approvals...</p>;
  }

  return (
    <><Navbarone />
    <div className="about-hero admin-hero">
      <div className="overlay">
        <Navbartwo />
        <div className="hero-text">
          <p>
            Dashboard <ChevronRight size={12} />Approvals <ChevronRight size={12} />
          </p>
          <h1>Pending Approvals</h1>
        </div>
      </div>
    </div><div className="bg-white p-5 rounded-xl shadow-sm">

        <h2 style={{ fontSize: "10px", textAlign:"center", marginBottom:"20px", marginTop:"20px" }}>
          Pending Property Approvals
        </h2>

        {pending.length === 0 ? (
          <p>No pending properties</p>
        ) : (
          <div id="approval-grid" className="approval-grid">
            {pending.map((p) => (
              <div key={p.id} className="approval-card">


                <div className="approval-img">
                  <img src={p.primaryImageUrl} alt={p.title} />
                </div>

                <div className="approval-body">
                  <h3>{p.title}</h3>
                  <p className="location">{p.location}</p>

                  <span className="badge">Pending</span>


                  <div className="approval-actions">
                    <button
                      onClick={() => approveProperty(p.id)}
                      className="approve-btn"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectProperty(p.id)}
                      className="reject-btn"
                    >
                      Reject
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div></>
);
};
export default Approvals;