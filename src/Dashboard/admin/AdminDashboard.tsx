import { useContext } from "react";
import { PropertyContext } from "../../pages/PropertyContext";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  
  const context = useContext(PropertyContext);
    if (!context) return null;

  const { properties } = context;

  const total = properties.length;
  const available = properties.filter((p) => p.status === "Available").length;
  const occupied = properties.filter((p) => p.status === "Occupied").length;
  const pending = properties.filter((p) => p.approval === "Pending").length;
  return (
    <>
      <Navbarone />

      <div className="about-hero admin-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Login <ChevronRight size={12} /> Dashboard
              <ChevronRight size={12} />
            </p>
            <h1>Admin</h1>
          </div>
        </div>
      </div>

      <div className="dash-container">
        <h1>Admin Analytics</h1>

        <div className="dash-grid">
          <Card title="Total Properties" value={total} />
          <Card title="Available" value={available} />
          <Card title="Occupied" value={occupied} />
          <Card title="Pending Approval" value={pending} />
        </div>

        <div className="dash-section">
          <h3>Recent Listings</h3>

          {(properties ?? []).slice(-4).map((p) => (
            <div key={p.id} className="list-item">
              <strong>{p.title}</strong> — {p.location}
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/dashboard/approvals")}>
         View Approvals
        </button>
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