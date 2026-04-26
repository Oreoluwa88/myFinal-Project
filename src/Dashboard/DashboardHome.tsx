import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { PropertyContext } from "../pages/PropertyContext";
import { Link } from "react-router-dom";

function DashboardHome() {
  const authContext = useContext(AuthContext);
  const propertyContext = useContext(PropertyContext);

  if (!authContext || !propertyContext) return null;

  const { user } = authContext;
  const { properties } = propertyContext;

  const safeProperties = properties ?? [];

  const total = safeProperties.length;

  const available = safeProperties.filter(
    (p) => p.status === "Available"
  ).length;

  const occupied = safeProperties.filter(
    (p) => p.status === "Occupied"
  ).length;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>

      {user?.role === "admin" && (
        <div>
          <h2>Admin Overview</h2>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Card title="Total Properties" value={total} />
            <Card title="Available" value={available} />
            <Card title="Occupied" value={occupied} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/dashboard/admin">Go to Analytics →</Link>
          </div>
        </div>
      )}

      {user?.role === "landlord" && (
        <div>
          <h2>Landlord Dashboard</h2>

          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <Card title="My Properties" value={total} />
            <Card title="Available Units" value={available} />
            <Card title="Occupied Units" value={occupied} />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/dashboard/add-property">+ Add Property</Link>
            <br />
            <Link to="/dashboard/my-properties">View My Properties →</Link>
          </div>
        </div>
      )}

      {user?.role === "tenant" && (
        <div>
          <h2>Tenant Dashboard</h2>

          <div style={{ display: "flex", gap: "15px" }}>
            <Card title="Active Rent" value="₦0" />
            <Card title="Next Due Date" value="--" />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Link to="/properties">Browse Properties →</Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "150px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default DashboardHome;