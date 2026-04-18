import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        
        <Topbar />

        <div style={{
          flex: 1,
          padding: "20px",
          background: "#f5f6fa",
          overflowY: "auto"
        }}>
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;