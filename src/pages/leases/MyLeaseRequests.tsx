import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyLeaseRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchMyRequests = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/lease-requests/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      const allRequests = data?.data || [];

      const userEmail = localStorage.getItem("email");

      const myRequests = allRequests.filter(
        (r: any) =>
          r.tenantEmail === userEmail || r.tenantId
      );

      setRequests(myRequests);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const openProperty = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Lease Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No lease requests found</p>
      ) : (
        <div style={grid}>
          {requests.map((r) => (
            <div key={r.id} style={card}>

              <div style={header}>
                <h3 style={{ margin: 0 }}>
                  {r.propertyTitle || "Property"}
                </h3>

                <span
                  style={{
                    ...badge,
                    background:
                      r.status === "APPROVED"
                        ? "#16a34a"
                        : r.status === "REJECTED"
                        ? "#dc2626"
                        : "#f59e0b",
                  }}
                >
                  {r.status || "PENDING"}
                </span>
              </div>

              <div style={info}>
                <p>
                  <b>Message:</b> {r.message || "No message"}
                </p>

                <p>
                  <b>Date:</b> {r.createdAt?.split("T")[0]}
                </p>

                <p
                  style={{ color: "#2563eb", cursor: "pointer" }}
                  onClick={() => openProperty(r.propertyId)}
                >
                  View Property →
                </p>
              </div>

              {r.status === "APPROVED" && (
                <div style={approvedBox}>
                  ✔ Landlord approved your request
                </div>
              )}

              {r.status === "REJECTED" && (
                <div style={rejectedBox}>
                  ✖ Request was rejected
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLeaseRequests;


const grid: any = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "15px",
};

const card: any = {
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "15px",
  background: "#fff",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
};

const header: any = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const badge: any = {
  color: "white",
  padding: "3px 8px",
  borderRadius: "999px",
  fontSize: "11px",
};

const info: any = {
  fontSize: "13px",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const approvedBox: any = {
  marginTop: "10px",
  padding: "8px",
  background: "#dcfce7",
  color: "#166534",
  borderRadius: "6px",
  fontSize: "12px",
};

const rejectedBox: any = {
  marginTop: "10px",
  padding: "8px",
  background: "#fee2e2",
  color: "#991b1b",
  borderRadius: "6px",
  fontSize: "12px",
};