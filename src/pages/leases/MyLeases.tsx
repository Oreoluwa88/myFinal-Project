import { useEffect, useState } from "react";
import "./MyLeases.css";

function MyLeases() {
  const token = localStorage.getItem("token");

  const [leases, setLeases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Leases/my-leases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setLeases(data.data || []);
      } catch (err) {
        console.error("Failed to fetch leases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeases();
  }, []);

  if (loading) {
    return <div className="tenant-leases-loading">Loading leases...</div>;
  }

  return (
    <div className="tenant-leases-page">

      <h2 className="tenant-leases-title">My Leases</h2>

      {leases.length === 0 ? (
        <p className="tenant-leases-empty">No active leases yet</p>
      ) : (
        <div className="tenant-leases-grid">
          {leases.map((l) => (
            <div key={l.id} className="tenant-lease-card">

              <div className="tenant-lease-header">
                <h3>{l.propertyTitle}</h3>
                <span className={`tenant-status ${l.status?.toLowerCase()}`}>
                  {l.status}
                </span>
              </div>

              <p className="tenant-address">{l.propertyAddress}</p>

              <div className="tenant-lease-info">

                <div>
                  <small>Rent</small>
                  <p>₦{l.rentAmount}</p>
                </div>

                <div>
                  <small>Start</small>
                  <p>{new Date(l.startDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <small>End</small>
                  <p>{new Date(l.endDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <small>Created</small>
                  <p>{new Date(l.createdDate).toLocaleDateString()}</p>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLeases;