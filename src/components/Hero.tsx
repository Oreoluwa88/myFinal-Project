import { PhoneCall, Globe, Map } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();

      if (location) query.append("Location", location);
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
        state: { results: data.data.items },
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <section className="hero">
      <div className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <PhoneCall size={14} color="white" />
          </div>
          <div> 
        <p style={{fontWeight:"bold", }}><span style={{color:"goldenrod"}}>Free call</span> +234 906 419 8423 </p>
        <p style={{fontSize:"8px", color:"grey"}}>Call us now 24/7 Customer support</p> 
        </div>
        </div>
         
         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <Map size={14} color="white" />
          </div>
        <div>
        <p style={{fontWeight:"bold", }}>Our Location</p>
        <p style={{fontSize:"8px", color:"grey"}}>Lekki, Lagos State, Nigeria</p>
        </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              border: "2px solid grey",
            }}
          >
            <Globe size={14} color="white" />
          </div>
        <div>
        <p style={{fontWeight:"bold", }}>Connect with us</p>
        <p style={{fontSize:"8px", color:"grey"}}>Twitter Instagram Whatsapp </p>
        </div>
        </div>
      </div>

      <div className="hero-nav">
        <h1 className="logo" style={{ paddingLeft: "20px" }}>
          Rentify
        </h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/contact">Contact</Link>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>

      <div className="hero-content">
        <h1>Find Your Dream Home</h1>
        <p>We help you find the best property in your city</p>
      </div>

      <div style={{ padding: "0px 200px" }}>
        <div className="hero-search-container">
          <div className="tabs">
            <button className="active" onClick={() => navigate("/register")}>Get Started</button>
            <button onClick={() => navigate("/properties")}>Rent</button>
          </div>

          <div className="hero-search-box">
            <input
              placeholder="Location (e.g Chevron, Lekki)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="property-select">
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
    </section>
  );
}

export default Hero;