import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropertyCard from "../Features/PropertyCards";
import { PropertyContext } from "../pages/PropertyContext";
import { ChevronRight } from "lucide-react";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import Footer from "../components/Footer";

function Properties() {
  const navigate = useNavigate();
  const { properties } = useContext(PropertyContext);
  const routerLocation = useLocation();
  const [searchLocation, setSearchLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const searchResults = routerLocation.state?.results;

  const dataToShow = searchResults || properties;

  const handleSearch = () => {
  const filtered = properties.filter((p: any) => {
    return (
      (searchLocation === "" || p.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
      (type === "" || p.title.toLowerCase().includes(type.toLowerCase())) &&
      (price === "" || Number(p.price) <= Number(price))
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

        <div className=" property-text">
          <p>Home <ChevronRight size={12} />Properties<ChevronRight size={12} /></p>
          <h1>All Properties</h1>
        </div>
      </div>
      <div style={{padding:"0px 200px"}}>
        <div className="search-container property-container">
          <div className="tabs">
            <button className="active" >Get Started</button>
            <button>Rent</button>
          </div>
      
      <div className="search-box">

          <input
          placeholder="Location (e.g Lagos)" value={searchLocation} 
          onChange={(e) => setSearchLocation(e.target.value)} />

          <input
          placeholder="Property Type (e.g Apartment)" value={type}
          onChange={(e) => setType(e.target.value)} />

          <input
          placeholder="Max Price" value={price}
          onChange={(e) => setPrice(e.target.value)} />

          <button onClick={handleSearch}> Search </button>

        </div>
      </div>
      </div>
    </div>
    
    
    <div>
        <div className="property-subtitle">
          <p>Explore a wide range of available properties
          ready for you to rent.</p>
        </div>
        
        <div className="property-cont">
        <div className="property-grid">
          {dataToShow.length === 0 ? (
            <p>No properties found</p>
          ) : (
            dataToShow.map((p: any, i: number) => (
              <PropertyCard key={i} {...p} />
            ))
          )}
        </div>
        </div>
      </div>
      <Footer />
      </>
  );
}

export default Properties;