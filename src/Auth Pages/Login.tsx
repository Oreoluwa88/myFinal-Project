import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../authentication/AuthContext";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import { ChevronRight } from "lucide-react";
import { loginUser } from "../api/propertyApi";

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


  const handleLogin = async () => {
  try {
    const res = await loginUser(form);

    if (res.success) {
      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem("token", token);

      setUser(user);

      if (user.role === "Admin") {
        navigate("/dashboard/admin");
      } else if (user.role === "Landlord") {
        navigate("/dashboard/landlord");
      } else {
        navigate("/dashboard/tenant");
      }
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
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
    <h1 className="text-red-500 text-3xl font-bold">
  Tailwind Test
</h1>
    </>
  );
}

export default Login;