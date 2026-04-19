import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../authentication/AuthContext";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import { ChevronRight } from "lucide-react";

function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleLogin = () => {
  const mockUser = {
    name: "User",
    role: "landlord",
  };

  setUser(mockUser);

  if (mockUser.role === "admin") {
    navigate("/dashboard/admin");
  } else if (mockUser.role === "landlord") {
    navigate("/dashboard/landlord");
  } else {
    navigate("/dashboard/tenant");
  }
};

  return (
    <>
    <Navbarone />
    <div className="about-hero login-hero">
      <div className="overlay">
        <Navbartwo />
    
        <div className="hero-text">
            <p>Home <ChevronRight size={12}/>Login<ChevronRight size={12}/></p>
            <h1>Login here</h1>
        </div>
      </div>
    </div>
    
    <div className="loginhere">
      <h2>Welcome Back</h2>
      <p>Login to access your dashboard</p>

      <input 
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
    <Footer/>
    </>
  );
}

export default Login;