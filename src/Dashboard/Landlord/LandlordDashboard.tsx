import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home, FileText, CreditCard, Plus, House } from "lucide-react";

import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

import CreateLease from "../../pages/leases/CreateLeases";
import LandlordLeases from "../../pages/leases/LandlordLeases";
import PaymentApproval from "../../pages/payments/PaymentApproval";

const BASE_URL = "https://propms-api.fly.dev/api/v1";

function LandlordDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState<any>(null);
  const [view, setView] = useState<
    "dashboard" | "createLease" | "leases" | "payments"
  >("dashboard");

  useEffect(() => {
    fetch(`${BASE_URL}/Dashboard/landlord`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStats(d.data));
  }, []);

  return (
    <>
      <Navbarone />

      <div className="about-hero landlord-hero">
        <div className="overlay">
          <Navbartwo />
          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} /> Landlord Dashboard
            </p>
            <h1>My Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="landlord-layout">

    
        <aside className="landlord-sidebar">
          <h2 className="logo">Landify</h2>

          <button onClick={() => setView("dashboard")}>
            <Home size={14} /> Overview
          </button>

          <button onClick={() => navigate("/dashboard/add-property")}>
            <Plus size={14} /> Add Property
          </button>

          <button onClick={()=> navigate("/dashboard/my-properties")}>
            <House size={14}/> My Properties
          </button>

          <button onClick={() => setView("leases")}>
            <FileText size={14} /> Leases
          </button>

          <button onClick={() => setView("payments")}>
            <CreditCard size={14} /> Payments
          </button>

          <button onClick={() => setView("createLease")}>
            Create Lease
          </button>
        </aside>


        <main className="landlord-main">

        
          <div className="landlord-topbar">
            <input placeholder="Search properties, tenants..." />

            <div className="top-actions">
              <div className="icon-circle">🔔</div>
              <div className="icon-circle">⚙️</div>

              <div className="profile-card">
                <img src="/images/landlord.jpg" />
                <div>
                  <h4>Landlord</h4>
                  <p>Property Owner</p>
                </div>
              </div>
            </div>
          </div>

      
          {view === "dashboard" && (
            <section className="overview">
              <h1>Overview</h1>

              <div className="landlord-card-grid">
                <Card title="Properties" value={stats?.totalProperties ?? 0} />
                <Card title="Occupied" value={stats?.occupiedProperties ?? 0} />
                <Card title="Vacant" value={stats?.vacantProperties ?? 0} />
                <Card title="Pending" value={stats?.pendingApprovalProperties ?? 0} />
                <Card title="Rent Collected" value={`₦${stats?.totalRentCollected ?? 0}`} />
                <Card title="Overdue" value={stats?.overduePaymentsCount ?? 0} />
                <Card title="Overdue Amount" value={`₦${stats?.overdueAmount ?? 0}`} />
              </div>
            </section>
          )}

          {view === "leases" && (
            <div className="landlord-panel">
              <LandlordLeases />
            </div>
          )}

          {view === "payments" && (
            <div className="landlord-panel">
              <PaymentApproval />
            </div>
          )}

    
          {view === "createLease" && (
            <div className="landlord-panel">
              <CreateLease />
            </div>
          )}

        </main>
      </div>

      <Footer />
    </>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="landlord-stat-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default LandlordDashboard;