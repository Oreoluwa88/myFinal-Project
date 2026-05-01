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
          },
        }
      );

      if (!res.ok) {
        console.error("Fetch failed:", res.status);
        setRequests([]);
        return;
      }

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
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/lease-requests/${req.id}/approve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: new Date().toISOString(),
            endDate: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toISOString(),
          }),
        }
      );

      if (!res.ok) {
        console.error("Approve failed:", res.status);
        return;
      }

      const data = await res.json();
      console.log("Approved:", data);

      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id: string) => {
    try {
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/lease-requests/${id}/reject`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reason: "Not approved",
          }),
        }
      );

      if (!res.ok) {
        console.error("Reject failed:", res.status);
        return;
      }

      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const openProperty = (propertyId: string) => {
    if (!propertyId) return;
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
        {["ALL"].map((f) => (
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "15px",
          }}
        >
          {filtered.map((r) => {
            const status = normalizeStatus(r.status);

            return (
              <div
                key={r.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "15px",
                  background: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3>{r.propertyTitle || "Property Request"}</h3>

                  <span
                    style={{
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
                    }}
                  >
                    {r.status || "UNKNOWN"}
                  </span>
                </div>

                <div style={{ marginTop: "10px" }}>
                  <p><b>Tenant:</b> {r.tenantName || "-"}</p>
                  <p><b>Email:</b> {r.tenantEmail || "-"}</p>
                  <p><b>Message:</b> {r.message || "No message"}</p>

                  <p
                    onClick={() => openProperty(r.propertyId)}
                    style={{ color: "#2563eb", cursor: "pointer" }}
                  >
                    View Property →
                  </p>

                  {r.createdLeaseId && (
                    <p style={{ fontSize: "12px", color: "#555" }}>
                      Lease Created: {r.createdLeaseId}
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  {status === "pending" && (
                    <>
                      <button
                        onClick={() => approve(r)}
                        style={{
                          background: "#16a34a",
                          color: "#fff",
                          padding: "6px 10px",
                          border: "none",
                          borderRadius: "6px",
                        }}
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => reject(r.id)}
                        style={{
                          background: "#dc2626",
                          color: "#fff",
                          padding: "6px 10px",
                          border: "none",
                          borderRadius: "6px",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {status === "approved" && (
                    <button
                      style={{
                        background: "#111",
                        color: "#fff",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      Lease Created Automatically
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