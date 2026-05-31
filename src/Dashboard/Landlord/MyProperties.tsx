import { useEffect, useState } from "react";
import PropertyCard from "../../Features/PropertyCards";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function MyProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"delete" | null>(null);

  const navigate = useNavigate();

  const extractBeds = (desc?: string) =>
    desc?.match(/Beds:(\d+)/)?.[1] ?? 0;

  const extractBaths = (desc?: string) =>
    desc?.match(/Baths:(\d+)/)?.[1] ?? 0;

  const extractSqm = (desc?: string) =>
    desc?.match(/Sqm:(\d+)/)?.[1] ?? 0;
  
  const getApprovalStatus = (property: any) =>
  (property.status || "Unknown").toUpperCase();

const getOccupancyStatus = (property: any) =>
  (property.occupancyStatus || "Available").toUpperCase();

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token);

        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Properties/my-properties",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        console.log("STATUS:", res.status);
        console.log("OK:", res.ok);

        const text = await res.text();
        console.log("RAW RESPONSE:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("Failed to parse JSON");
          setLoading(false);
          return;
        }

        setProperties(data?.data || []);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

  const handleEdit = (property: any) => {
    navigate(`/dashboard/edit-property/${property.id}`, {
      state: property,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

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

      setShowModal(false);
      setSelectedProperty(null);
      setActionType(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const confirmDelete = (property: any) => {
    setSelectedProperty(property);
    setActionType("delete");
    setShowModal(true);
  };

  return (
    <>
    <div className="my-properties">
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
        <h2
          style={{
            textAlign: "center",
            fontSize: "24px",
            marginTop: "30px",
            marginBottom: "40px",
          }}
        >
          My Listings
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : properties.length === 0 ? (
          <p style={{ textAlign: "center" }}>No properties yet</p>
        ) : (
          <div className="property-grid" style={{ padding: "30px" }}>
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="property-card-wrapper"
                onClick={() => navigate(`/properties/${prop.id}`)}
                style={{ cursor: "pointer" }}
              >
                <PropertyCard
                  image={prop.primaryImageUrl}
                  title={prop.title}
                  location={prop.location}
                  price={prop.rentAmount}
                  status={getOccupancyStatus(prop)}
                  approvalStatus={getApprovalStatus(prop)}
                  propertyType={prop.propertyType}
                  beds={extractBeds(prop.description)}
                  baths={extractBaths(prop.description)}
                  sqm={extractSqm(prop.description)}
                />
                

                <div className="action-buttons">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(prop);
                    }}
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(prop);
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              width: "350px",
              textAlign: "center",
            }}
          >
            {actionType === "delete" && (
              <>
                <h3>Delete Property?</h3>
                <p style={{ fontSize: "13px" }}>
                  This action cannot be undone.
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedProperty(null);
                      setActionType(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleDelete(selectedProperty.id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "6px",
                    }}
                  >
                    Yes, Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default MyProperties;