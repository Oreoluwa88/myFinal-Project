import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

import CreateLease from "../../pages/leases/CreateLeases";
import LandlordLeases from "../../pages/leases/LandlordLeases";
import PaymentApproval from "../../pages/payments/PaymentApproval";

function LandlordDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  const [view, setView] = useState<
    "dashboard" | "createLease" | "leases" | "payments"
  >("dashboard");

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Dashboard/landlord",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setStats(data.data);
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <Navbarone />

      <div className="about-hero landlord-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Login <ChevronRight size={12} /> Dashboard
            </p>
            <h1>Landlord Dashboard</h1>
          </div>
        </div>
      </div>

      <div className="dash-container">
        <h1>Landlord Dashboard</h1>

        <div className="dash-grid">
          <Card title="Total Properties" value={stats?.totalProperties ?? 0} />
          <Card title="Occupied" value={stats?.occupiedProperties ?? 0} />
          <Card title="Vacant" value={stats?.vacantProperties ?? 0} />
          <Card title="Pending Approval" value={stats?.pendingApprovalProperties ?? 0} />
          <Card title="Total Rent" value={`₦${stats?.totalRentCollected ?? 0}`} />
          <Card title="Overdue Payments" value={stats?.overduePaymentsCount ?? 0} />
        </div>

        <div className="dash-section">
          <h3>Quick Actions</h3>

          <div className="flex gap-3 flex-wrap">
            <button onClick={() => navigate("/dashboard/add-property")}>
              Add Property
            </button>

            <button onClick={() => navigate("/dashboard/my-properties")}>
              View Properties
            </button>

            <button onClick={() => setView("createLease")}>
              Create Lease
            </button>

            <button onClick={() => setView("leases")}>
              View Leases
            </button>

            <button onClick={() => setView("payments")}>
              Payment Approvals
            </button>
          </div>
        </div>

  
        <div className="mt-6">
          {view === "createLease" && <CreateLease />}
          {view === "leases" && <LandlordLeases />}
          {view === "payments" && <PaymentApproval />}
        </div>
      </div>

      <Footer />
    </>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div className="dash-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default LandlordDashboard;