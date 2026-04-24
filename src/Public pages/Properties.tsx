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
  const [searchLocation, setSearchLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Properties"
        );

        const data = await res.json();
        setProperties(data.data.items || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  const searchResults = locationState.state?.results;

  const dataToShow = searchResults ?? properties;

  const handleSearch = () => {
    const filtered = properties.filter((p: any) => {
      return (
        (searchLocation === "" ||
          p.location
            ?.toLowerCase()
            .includes(searchLocation.toLowerCase())) &&
        (type === "" ||
          p.propertyType?.toLowerCase().includes(type.toLowerCase())) &&
        (price === "" || Number(p.rentAmount || 0) <= Number(price))
      );
    });

    navigate("/properties", { state: { results: filtered } });
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero properties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="property-text">
            <p>
              Home <ChevronRight size={12} /> Properties
              <ChevronRight size={12} />
            </p>
            <h1>All Properties</h1>
          </div>
        </div>

        <div style={{ padding: "0px 200px" }}>
          <div className="search-container property-container">
            <div className="tabs">
              <button className="active">Get Started</button>
              <button>Rent</button>
            </div>

            <div className="search-box">
              <input
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />

              <input
                placeholder="Property Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />

              <input
                placeholder="Max Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <button type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="property-cont">
        <div className="property-grid">
          {dataToShow.length === 0 ? (
            <p>No properties found</p>
          ) : (
            dataToShow.map((p: any) => (
              <PropertyCard
                key={p.id}
                image={p.primaryImageUrl}
                title={p.title}
                location={p.location}
                price={p.rentAmount}
                status={p.status}
                beds={0}
                baths={0}
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Properties;