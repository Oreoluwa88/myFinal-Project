import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ChevronRight } from "lucide-react";
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
    role: "tenant",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleRegister = async (e?: any) => {
  if (e) e.preventDefault();

  if (!form.firstname || !form.lastname || !form.email || !form.password) {
    alert("Please fill all required fields");
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

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

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