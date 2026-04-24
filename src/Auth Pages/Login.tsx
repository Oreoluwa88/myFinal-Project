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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e?: any) => {
    if (e) e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUser(form);

      if (res?.success) {
        const user = res.data?.user;
        const token = res.data?.token;

        if (!token) {
          alert("Login failed: No token received");
          return;
        }

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
        alert(res?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero login-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} />
              Login <ChevronRight size={12} />
            </p>
            <h1>Login here</h1>
          </div>
        </div>
      </div>

      <div className="loginhere">
        <h2>Welcome Back</h2>
        <p>Login to access your dashboard</p>

        <form onSubmit={handleLogin}>
          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Login;