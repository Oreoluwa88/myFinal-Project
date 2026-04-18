import { useContext, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { PropertyContext } from "../../pages/PropertyContext";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight } from "lucide-react";
import Footer from "../../components/Footer";

function AdminDashboard() {
  const { properties } = useContext(PropertyContext);

  const total = properties.length;
  const available = properties.filter((p: { status: string; }) => p.status === "Available").length;
  const occupied = properties.filter((p: { status: string; }) => p.status === "Occupied").length;

  return (

    <>
    <Navbarone />
    <div className="about-hero admin-hero">
      <div className="overlay">
        <Navbartwo />

        <div className="hero-text">
          <p>Login <ChevronRight size={12} />Dashboard<ChevronRight size={12} /></p>
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
        </div>

        <div className="dash-section">
          <h3>Recent Listings</h3>

          {properties.slice(-4).map((p: { title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, i: Key | null | undefined) => (
            <div key={i} className="list-item">
              <strong>{p.title}</strong> — {p.location}
            </div>
          ))}
        </div>
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

export default AdminDashboard;