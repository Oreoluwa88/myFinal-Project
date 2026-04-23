import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

function LandlordDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Dashboard/landlord",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        console.log("DASHBOARD RESPONSE:", data);

        setStats(data.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
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
              <ChevronRight size={12} />
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

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => navigate("/dashboard/add-property")}>
              Add Property
            </button>

            <button onClick={() => navigate("/dashboard/my-properties")}>
              View Properties
            </button>

            <button onClick={() => alert("Rent tracking coming soon")}>
              Track Rent
            </button>
          </div>
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