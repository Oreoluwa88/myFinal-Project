import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../authentication/AuthContext";

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{
      width: "240px",
      background: "#111",
      color: "#fff",
      padding: "20px"
    }}>
      <h2>Rentify</h2>

      <Link to="/dashboard" style={{ color: "#fff", display: "block" }}>
        Dashboard
      </Link>

      <Link to="/dashboard/properties" style={{ color: "#fff", display: "block" }}>
        Properties
      </Link>

      {user?.role === "landlord" && (
        <Link to="/dashboard/add-property" style={{ color: "#fff", display: "block" }}>
          Add Property
        </Link>
      )}

      {user?.role === "landlord" && (
        <Link to="/dashboard/my-properties" style={{ color: "#fff", display: "block" }}>
          My Properties
        </Link>
      )}

      {user?.role === "admin" && (
        <Link to="/dashboard/admin" style={{ color: "#fff", display: "block" }}>
          Analytics
        </Link>
      )}

      {user?.role === "tenant" && (
        <Link to="/dashboard/tenant" style={{ color: "#fff", display: "block" }}>
          My Rent
        </Link>
      )}
    </div>
  );
}

export default Sidebar;