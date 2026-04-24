import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

import MyLeases from "../../pages/leases/MyLeases";
import TenantPayment from "../../pages/payments/TenantPayment";
import PaymentHistory from "../../pages/payments/PaymentHistory";

function TenantDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "leases" | "payments" | "history"
  >("dashboard");

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

  
      <div className="flex gap-3 p-4 justify-center">
        <button onClick={() => setActiveTab("dashboard")}>Overview</button>
        <button onClick={() => setActiveTab("leases")}>My Leases</button>
        <button onClick={() => setActiveTab("payments")}>Make Payment</button>
        <button onClick={() => setActiveTab("history")}>
          Payment History
        </button>
      </div>

    
      <div className="dash-container">
        {activeTab === "dashboard" && (
          <>
            <h1>Tenant Dashboard</h1>

            <div className="dash-grid">
              <Card title="Active Rent" value="₦0" />
              <Card title="Due Date" value="--" />
              <Card title="Payments" value="0" />
            </div>

            <div className="dash-section">
              <h3>Quick Actions</h3>

              <button onClick={() => navigate("/properties")}>
                Browse Properties
              </button>

              <button onClick={() => setActiveTab("history")}>
                View Payment History
              </button>
            </div>
          </>
        )}

        {activeTab === "leases" && <MyLeases />}

        {activeTab === "payments" && <TenantPayment />}

        {activeTab === "history" && <PaymentHistory />}
      </div>

      <Footer />
    </>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="dash-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default TenantDashboard;