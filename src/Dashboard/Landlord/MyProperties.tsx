import { useEffect, useState } from "react";
import PropertyCard from "../../Features/PropertyCards";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import Footer from "../../components/Footer";

function MyProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Properties/my-properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();
        setProperties(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchMyProperties();
  }, [token]);


  const handleDelete = async (id: string) => {
    try {
      await fetch(
        `https://propms-api.fly.dev/api/v1/Properties/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };


  const handleEdit = (property: any) => {
    localStorage.setItem("editProperty", JSON.stringify(property));
    window.location.href = "/edit-property";
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero myproperties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} />
              My Properties <ChevronRight size={12} />
            </p>
            <h1>My Properties</h1>
          </div>
        </div>
      </div>

      <div className="property-section">
        <h2 className="section-title">My Listings</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : properties.length === 0 ? (
          <p style={{ textAlign: "center" }}>No properties yet</p>
        ) : (
          <div className="property-grid">
            {properties.map((prop) => (
              <div key={prop.id} className="property-card-wrapper">
                <PropertyCard {...prop} />

                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(prop)}
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(prop.id)}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default MyProperties;