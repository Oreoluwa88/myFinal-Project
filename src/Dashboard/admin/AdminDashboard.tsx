import { useEffect, useState } from "react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import Approvals from "./Approvals";
import PaymentConfirmation from "../../pages/payments/PaymentConfirmation";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Dashboard/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setStats(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdminDashboard();
  }, []);

  return (
    <>
      <Navbarone />

      <div className="about-hero admin-hero">
        <div className="overlay">
          <Navbartwo />
          <div className="hero-text">
            <p>
              Login <ChevronRight size={12} /> Dashboard
            </p>
            <h1>Admin</h1>
          </div>
        </div>
      </div>

      <div className="dash-container">
        <h1>Admin Analytics</h1>


        <div className="dash-grid">
          <Card title="Total Users" value={stats?.totalUsers ?? 0} />
          <Card title="Landlords" value={stats?.totalLandlords ?? 0} />
          <Card title="Tenants" value={stats?.totalTenants ?? 0} />
          <Card title="Properties" value={stats?.totalProperties ?? 0} />
          <Card title="Pending Approvals" value={stats?.pendingApprovals ?? 0} />
          <Card title="Active Leases" value={stats?.activeLeases ?? 0} />
          <Card title="Revenue" value={`₦${stats?.totalRevenue ?? 0}`} />
          <Card title="Overdue" value={stats?.overduePayments ?? 0} />
        </div>

   
        <div className="mt-10 space-y-10">

       
          <Approvals />

     
          <PaymentConfirmation />

        </div>

  
        <div className="dash-section mt-10">
          <h3>Quick Actions</h3>
          <button onClick={() => navigate("/dashboard/approvals")}>
            View Approvals Page
          </button>
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

export default AdminDashboard;