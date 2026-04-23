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

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleRegister = async () => {
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

    if (res.success) {
      navigate("/login");
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
    <div className="about-hero register-hero">
      <div className="overlay">
        <Navbartwo />
    
        <div className="hero-text">
          <p>Home <ChevronRight size={12}/>Register<ChevronRight size={12}/></p>
          <h1>Register here</h1>
        </div>
      </div>
    </div>
    
    <div className="registerhere">
      <h2>Create Account</h2>

      <input name="firstname" placeholder="First Name" onChange={handleChange} />
      <input name="lastname" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="tenant">Tenant</option>
        <option value="landlord">Landlord</option>
      </select>

      <button onClick={handleRegister}>Register</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    <Footer/>
    </>
  );
}

export default Register;