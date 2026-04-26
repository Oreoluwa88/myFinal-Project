import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import { registerUser } from "../api/propertyApi";

function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "tenant",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e?: any) => {
    if (e) e.preventDefault();

    if (
      !form.firstname ||
      !form.lastname ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    const registerData = {
      firstName: form.firstname,
      lastName: form.lastname,
      email: form.email,
      password: form.password,
      phoneNumber: form.phone,
      role: form.role,
    };

    try {
      const res = await registerUser(registerData);

      console.log("REGISTER RAW RESPONSE:", res);

      if (!res?.success && !res?.data) {
        alert(res?.message || "Registration failed");
        return;
      }

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      alert("Network error or server unavailable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero register-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} />
              Register <ChevronRight size={12} />
            </p>
            <h1>Register here</h1>
          </div>
        </div>
      </div>

      <div className="registerhere">
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input
            name="firstname"
            placeholder="First Name"
            value={form.firstname}
            onChange={handleChange}
          />

          <input
            name="lastname"
            placeholder="Last Name"
            value={form.lastname}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <div style={{ position: "relative", padding:"0px 10px" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={{ width: "100%", paddingRight: "5px", marginLeft:"-10px", marginRight:"10px" }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />} 
            </span>
          </div>

          <div style={{ position: "relative", marginTop: "-1px", padding:"0px 10px" }}>
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              style={{ width: "100%", paddingRight: "5px", marginLeft:"-10px", marginRight:"10px" }}
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#555",
              }}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      <Footer />
    </>
  );
}

export default Register;