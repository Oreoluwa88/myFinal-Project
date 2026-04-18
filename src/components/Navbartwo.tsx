import { useNavigate, Link } from "react-router-dom"

export default function Navbartwo() {
  const navigate = useNavigate();

  return (
    <div className="navtwo">
      <h1 className="logo">Rentify</h1>

      <div className="newnav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/contact">Contact</Link>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
}