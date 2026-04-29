import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../Features/PropertyCards";
import { ChevronRight } from "lucide-react";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import Footer from "../components/Footer";

function Properties() {
  const navigate = useNavigate();
  const locationState = useLocation();

  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propRes = await fetch(
          "https://propms-api.fly.dev/api/v1/Properties"
        );

        const propText = await propRes.text();
        const propData = propText ? JSON.parse(propText) : {};

        const rawProps =
          propData?.data?.items ??
          propData?.data ??
          [];

        setProperties(Array.isArray(rawProps) ? rawProps : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatus = (property: any) => {
    const status = (property.status || "").toLowerCase();

    if (status.includes("occupied")) return "OCCUPIED";
    if (status.includes("active")) return "OCCUPIED";

    return "AVAILABLE";
  };

  const searchResults = (locationState as any)?.state?.results;

  const dataToShow = Array.isArray(searchResults)
    ? searchResults
    : properties;

  return (
    <>
      <Navbarone />

      <div className="properties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p style={{ marginTop: "-20px" }}>
              Home <ChevronRight size={12} /> Properties
            </p>
            <h1 style={{ marginTop: "-10px" }}>All Properties</h1>
          </div>
        </div>

        <div className="search-wrapper" style={{ marginTop: "-180px" }}>
          <div className="hero-search-container">
            <div className="tabs">
              <button className="active" onClick={() => navigate("/register")}>
                Get Started
              </button>
              <button onClick={() => navigate("/properties")}>Rent</button>
            </div>

            <div className="hero-search-box">
              <input
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Shop">Shop</option>
                <option value="Land">Land</option>
              </select>

              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />

              <button>Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="properties-container" style={{ padding: "100px 0px" }}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : (
          <div className="property-grid">
            {dataToShow.length === 0 ? (
              <p>No properties found</p>
            ) : (
              dataToShow.map((p: any) => {
                const status = getStatus(p);

                return (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/properties/${p.id}`)}
                    style={{ position: "relative" }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background:
                          status === "OCCUPIED" ? "#dc2626" : "#16a34a",
                        color: "white",
                        padding: "4px 10px",
                        fontSize: "10px",
                        borderRadius: "999px",
                        zIndex: 2,
                      }}
                    >
                      {status}
                    </span>

                    <PropertyCard
                      image={p.primaryImageUrl}
                      title={p.title}
                      location={p.location}
                      price={p.rentAmount}
                      status={status}
                      beds={p.description?.match(/Beds:(\d+)/)?.[1] ?? 0}
                      baths={p.description?.match(/Baths:(\d+)/)?.[1] ?? 0}
                      sqm={p.description?.match(/Sqm:(\d+)/)?.[1] ?? 0}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Properties;