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

  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Properties"
        );

        const data = await res.json();
        setProperties(data?.data?.items || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  const searchResults = (locationState as any)?.state?.results;
  const dataToShow = searchResults ?? properties;

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();

      if (searchLocation) query.append("Location", searchLocation);
      if (propertyType) query.append("PropertyType", propertyType);
      if (minPrice) query.append("MinPrice", minPrice);
      if (maxPrice) query.append("MaxPrice", maxPrice);

      query.append("Page", "1");
      query.append("PageSize", "10");

      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Properties?${query.toString()}`
      );

      const data = await res.json();

      navigate("/properties", {
        state: { results: data?.data?.items || [] },
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <>
      <Navbarone />

      <div className="properties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p style={{marginTop:"-20px"}}>
              Home <ChevronRight size={12} /> Properties
            </p>
            <h1 style={{ marginTop:"-10px"}}>All Properties</h1>
          </div>
        </div>

        <div className="search-wrapper" style={{ marginTop:"-180px"}}>
          <div className="hero-search-container">
            <div className="tabs">
              <button className="active" onClick={() => navigate("/register")}>Get Started</button>
              <button onClick={() => navigate("/properties")}>Rent</button>
            </div>

            <div className="hero-search-box">
              <input
                placeholder="Location (e.g Chevron, Lekki)"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />

              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="property-select"
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

              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="properties-container" style={{ padding: "100px 0px" }}>
        <p style={{fontWeight:"bold", marginBottom:"40px", textAlign:"center", fontSize:"10px"}}> Explore our properties here and find the perfect one tailored to your needs </p>
        <div className="property-grid">
          {dataToShow.length === 0 ? (
            <p>No properties found</p>
          ) : (
            dataToShow.map((p: any) => (
              <div
                key={p.id}
                className="property-click"
                onClick={() => navigate(`/properties/${p.id}`)}
              >
                <PropertyCard
                  image={p.primaryImageUrl}
                  title={p.title}
                  location={p.location}
                  price={p.rentAmount}
                  status={p.status}
                  beds={0}
                  baths={0}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Properties;