import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LandlordLeases({ compact = false }: any) {
  const token = localStorage.getItem("token");
  const [leases, setLeases] = useState<any[]>([]);
  const navigate = useNavigate();

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
      setLeases(data?.data || []);
    };

    fetchData();
  }, []);

  const terminateLease = async (lease: any) => {
    try {
      await fetch(
        `https://propms-api.fly.dev/api/v1/Leases/${lease.id}/terminate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeases((prev) => prev.filter((l) => l.id !== lease.id));
      alert("Lease terminated");
    } catch (err) {
      console.error(err);
      alert("Failed to terminate lease");
    }
  };

  const list = compact ? leases.slice(0, 3) : leases;

  return (
    <div className={compact ? "lease-compact" : "lease-full"}>
      {!compact && <h1 className="page-title">Landlord Leases</h1>}

      <div className="lease-grid">
        {list.map((l) => (
          <div key={l.id} className="lease-card">

            <div onClick={() => navigate(`/leases/${l.id}`)}>
              <div className="lease-header">
                <h2>{l.propertyTitle}</h2>

                <span className={`status ${l.status?.toLowerCase()}`}>
                  {l.status}
                </span>
              </div>

              <p className="muted">{l.propertyAddress}</p>

              <div className="lease-info">
                <div>
                  <small>Tenant</small>
                  <p>{l.tenantName}</p>
                </div>

                <div>
                  <small>Email</small>
                  <p>{l.tenantEmail}</p>
                </div>

                <div>
                  <small>Rent</small>
                  <p>₦{l.rentAmount}</p>
                </div>

                <div>
                  <small>Start</small>
                  <p>{l.startDate}</p>
                </div>

                <div>
                  <small>End</small>
                  <p>{l.endDate}</p>
                </div>

                <div>
                  <small>Created</small>
                  <p>{l.createdDate}</p>
                </div>
              </div>
            </div>

            {!compact && (
              <button
                onClick={() => terminateLease(l)}
                className="terminate-btn"
              >
                Terminate Lease
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default LandlordLeases;