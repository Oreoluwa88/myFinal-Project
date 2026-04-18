import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function TenantDashboard() {
   const navigate = useNavigate();
  return (
    
    <>
    <Navbarone />
    <div className="about-hero landlord-hero">
      <div className="overlay">
        <Navbartwo />

        <div className="hero-text">
          <p>Login <ChevronRight size={12} />Dashboard<ChevronRight size={12} /></p>
          <h1>Tenant Dashboard</h1>
        </div>
      </div>
    </div><div className="dash-container">
        <h1>Tenant Dashboard</h1>

        <div className="dash-grid">
          <Card title="Active Rent" value="₦0" />
          <Card title="Due Date" value="--" />
          <Card title="Payments" value="0" />
        </div>

        <div className="dash-section">
          <h3>Quick Actions</h3>
          <button onClick={() => navigate("/properties")}>Browse Properties</button>
          <button>View Payment History</button>
        </div>
      </div>
      <Footer/>
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