import { useEffect, useState } from "react";
import { ChevronRight, Home, FileText, CreditCard, History, LogOut, Settings, Bell } from "lucide-react";

import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import MyLeases from "../../pages/leases/MyLeases";
import TenantPayment from "../../pages/payments/TenantPayment";
import PaymentHistory from "../../pages/payments/PaymentHistory";
import "./TenantDashboard.css";
import "../../pages/Notifications.css";
import MyLeaseRequests from "../../pages/leases/MyLeaseRequests";


const BASE_URL = "https://propms-api.fly.dev/api/v1";

function TenantDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState<any[]>([]);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/Notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchNotifications();

  const interval = setInterval(fetchNotifications, 30000);
  return () => clearInterval(interval);
}, [token]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [view, setView] = useState<
    "dashboard" | "leases" | "payments" | "history" | "my-lease-requests"
  >("dashboard");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  

  return (
    <>
      <Navbarone />

  
      <div className="about-hero landlord-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Login <ChevronRight size={12} />
              Dashboard <ChevronRight size={12} />
            </p>
            <h1>Tenant Dashboard</h1>
          </div>
        </div>
      </div>

  
      <div className="tenant-dashboard-layout">

        <aside className="tenant-sidebar">

          <h2 className="tenant-logo">Rentify</h2>

          <div className="tenant-user-box">
            <p className="tenant-name">
              {user?.fullName || "Tenant User"}
            </p>
            <span className="tenant-role">Tenant Account</span>
          </div>

          <button onClick={() => setView("dashboard")}>
            <Home size={16} /> Overview
          </button>

          <button onClick={() => setView("leases")}>
            <FileText size={16} /> My Leases
          </button>

          <button onClick={() => setView("my-lease-requests")}>
            <FileText size={16} /> My Lease Requests
          </button>

          <button onClick={() => setView("payments")}>
            <CreditCard size={16} /> Payments
          </button>

          <button onClick={() => setView("history")}>
            <History size={16} /> Payment History
          </button>

          <button onClick={() => navigate("/properties")}>
            Browse Properties
          </button>

          <button className="tenant-logout" onClick={logout}>
            <LogOut size={16} /> Logout
          </button>

        </aside>

  
        <main className="landlord-main">

        
          <div className="landlord-topbar">
            <input placeholder="Search properties, tenants..." />

            <div className="top-actions">
              <div className="icon-circle" onClick={() => navigate("/notifications")}
                  style={{ cursor: "pointer" }}>
                    <Bell size={16}/>
                  {unreadCount > 0 && (
                  <span className="notif-badge">{unreadCount}</span>)}
              </div>
              <div className="icon-circle"><Settings size={16}/></div>

              <div className="profile-card">
                <img src="/images/landlord.jpg" />
                <div>
                  <h4>Darasimi</h4>
                  <p>Tenant</p>
                </div>
              </div>
            </div>
          </div>

    
          <div className="tenant-content">

            {view === "dashboard" && (
              <div className="tenant-overview">

                <h2>Overview</h2>

                <div className="tenant-grid">

                  <div className="tenant-card">
                    <h4>Active Rent</h4>
                    <h2>₦0</h2>
                  </div>

                  <div className="tenant-card">
                    <h4>Next Due</h4>
                    <h2>--</h2>
                  </div>

                  <div className="tenant-card">
                    <h4>Total Payments</h4>
                    <h2>0</h2>
                  </div>

                </div>

              </div>
            )}

            {view === "leases" && <MyLeases />}

            {view === "my-lease-requests" && <MyLeaseRequests />}

            {view === "payments" && <TenantPayment />}

            {view === "history" && <PaymentHistory />}

          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}

export default TenantDashboard;