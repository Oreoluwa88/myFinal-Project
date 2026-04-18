import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PropertyContext } from "../pages/PropertyContext";

function Hero() {
  const navigate = useNavigate();

  const context = useContext(PropertyContext);
  if (!context) return null;

  const { properties } = context;

  const safeProperties = properties ?? [];

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");

  const handleSearch = () => {
    const filtered = safeProperties.filter((p) => {
      return (
        (location === "" ||
          p.location.toLowerCase().includes(location.toLowerCase())) &&
        (type === "" ||
          p.title.toLowerCase().includes(type.toLowerCase())) &&
        (price === "" || Number(p.price) <= Number(price))
      );
    });

    navigate("/properties", { state: { results: filtered } });
  };

  return (
    <section className="hero">
      <div className="topbar">
        <div>
          <p style={{ fontWeight: "bold" }}>
            <span style={{ color: "goldenrod" }}>Free call</span> +234 906 419 8423
          </p>
          <p style={{ fontSize: "8px", color: "grey" }}>
            Call us now 24/7 Customer support
          </p>
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>Our Location</p>
          <p style={{ fontSize: "8px", color: "grey" }}>
            Lekki, Lagos State, Nigeria
          </p>
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>Connect with us</p>
          <p style={{ fontSize: "8px", color: "grey" }}>
            Twitter Instagram Whatsapp
          </p>
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
        <div className="search-container">
          <div className="tabs">
            <button className="active">Get Started</button>
            <button>Rent</button>
          </div>

          <div className="search-box">
            <input
              placeholder="Location (e.g Lagos)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              placeholder="Property Type (e.g Apartment)"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <input
              placeholder="Max Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;