import { useContext } from "react";
import { AuthContext } from "../../authentication/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{
      height: "60px",
      borderBottom: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <h3>Dashboard</h3>

      <p>{user?.name} ({user?.role})</p>
    </div>
  );
}

export default Topbar;