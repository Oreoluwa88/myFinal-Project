import { useContext } from "react";
import { PropertyContext } from "../../pages/PropertyContext";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

function LandlordDashboard() {
  const { properties } = useContext(PropertyContext);
  const navigate = useNavigate();

  const myProperties = properties; 

  const total = myProperties.length;
  const occupied = myProperties.filter((p: { status: string; }) => p.status === "Occupied").length;
  const revenue = myProperties.reduce((sum: number, p: { price: any; }) => sum + Number(p.price || 0), 0);

  return (

    <>
    <Navbarone />
    <div className="about-hero landlord-hero">
      <div className="overlay">
        <Navbartwo />

        <div className="hero-text">
          <p>Login <ChevronRight size={12} />Dashboard<ChevronRight size={12} /></p>
          <h1>Landlord Dashboard</h1>
        </div>
      </div>
    </div>
    
    <div className="dash-container">
        <h1>Landlord Dashboard</h1>

        <div className="dash-grid">
          <Card title="My Properties" value={total} />
          <Card title="Occupied" value={occupied} />
          <Card title="Revenue" value={`₦${revenue.toLocaleString()}`} />
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

function Card({ title, value }: any) {
  return (
  
    <>
    <div className="dash-card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
    </>
  );
}

export default LandlordDashboard;