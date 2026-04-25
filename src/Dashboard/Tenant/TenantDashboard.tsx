import { useState } from "react";
import { ChevronRight, Home, FileText, CreditCard, History, LogOut } from "lucide-react";

import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import MyLeases from "../../pages/leases/MyLeases";
import TenantPayment from "../../pages/payments/TenantPayment";
import PaymentHistory from "../../pages/payments/PaymentHistory";

function TenantDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [view, setView] = useState<
    "dashboard" | "leases" | "payments" | "history"
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

  
        <main className="tenant-main">

  
          <div className="tenant-topbar">

            <h3>
              Tenant Dashboard{" "}
              <ChevronRight size={14} />{" "}
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </h3>

            <div className="tenant-top-right">
              <p>{user?.fullName || "Tenant"}</p>
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