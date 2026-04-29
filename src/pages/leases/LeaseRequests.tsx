import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LeaseRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("PENDING");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/lease-requests/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();
      const json = text ? JSON.parse(text) : {};

      const list =
        json?.data?.items ??
        json?.data ??
        json ??
        [];

      setRequests(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approve = async (req: any) => {
    try {
      await fetch(
        `https://propms-api.fly.dev/api/v1/lease-requests/${req.id}/approve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // optional auto-refresh
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id: string) => {
    try {
      await fetch(
        `https://propms-api.fly.dev/api/v1/lease-requests/${id}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const openProperty = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  const normalizeStatus = (status: string) =>
    (status || "").toLowerCase();

  const filtered =
    filter === "ALL"
      ? requests
      : requests.filter(
          (r) => normalizeStatus(r.status) === filter.toLowerCase()
        );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lease Requests</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 10px",
              background: filter === f ? "#111" : "#eee",
              color: filter === f ? "#fff" : "#000",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filtered.length === 0 ? (
        <p>No lease requests found</p>
      ) : (
        <div style={grid}>
          {filtered.map((r) => {
            const status = normalizeStatus(r.status);

            return (
              <div key={r.id} style={card}>
                <div style={header}>
                  <h3>{r.propertyTitle || "Property Request"}</h3>

                  <span style={{
                    background:
                      status === "pending"
                        ? "#f59e0b"
                        : status === "approved"
                        ? "#16a34a"
                        : "#dc2626",
                    color: "#fff",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "11px",
                  }}>
                    {r.status || "UNKNOWN"}
                  </span>
                </div>

                <div style={info}>
                  <p><b>Tenant:</b> {r.tenantName}</p>
                  <p><b>Email:</b> {r.tenantEmail}</p>
                  <p><b>Message:</b> {r.message || "No message"}</p>

                  <p
                    onClick={() => openProperty(r.propertyId)}
                    style={{ color: "#2563eb", cursor: "pointer" }}
                  >
                    View Property →
                  </p>
                </div>

                <div style={actions}>
                  {status === "pending" && (
                    <>
                      <button onClick={() => approve(r)} style={green}>
                        Approve
                      </button>

                      <button onClick={() => reject(r.id)} style={red}>
                        Reject
                      </button>
                    </>
                  )}

                  {status === "approved" && (
                    <button style={infoBtn}>
                      Ready for Lease Creation
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LeaseRequests;

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "15px",
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "15px",
  background: "#fff",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
};

const info = {
  fontSize: "13px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const actions = {
  display: "flex",
  gap: "10px",
  marginTop: "10px",
};

const green = {
  background: "#16a34a",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
};

const red = {
  background: "#dc2626",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
};

const infoBtn = {
  background: "#111",
  color: "#fff",
  padding: "6px 10px",
  border: "none",
};