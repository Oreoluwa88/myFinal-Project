import { useNavigate, Link } from "react-router-dom";

export default function Navbartwo() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="navtwo">
      <h1 className="logo">Rentify</h1>

      <div className="newnav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/properties">Properties</Link>
        <Link to="/contact">Contact</Link>

        {!token ? (
          <button onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}