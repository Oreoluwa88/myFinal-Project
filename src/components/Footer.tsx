import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col">
          <h2 className="logo">Rentify</h2>
          <p style={{fontSize:"10px"}}>
            A smart property management system helping landlords and tenants
            manage rentals easily and efficiently.
          </p>

          <div className="socials">
            <a href="https://instagram.com/ms.orreee" target="_blank" rel="noopener noreferrer">
            <FaInstagram/>
            </a>
            <a href="https://twitter.com/ms_orreee" target="_blank" rel="noopener noreferrer">
            <FaTwitter/>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Offers</h3>
          <ul>
            <li onClick={() => navigate("/properties")}><ChevronRight size={14}/>Properties</li>
            <li onClick={() => navigate("/landlord")}><ChevronRight size={14}/>Landlord</li>
            <li onClick={() => navigate("/categories")}><ChevronRight size={14}/>Locations</li>
            <li onClick={() => navigate("/contact")}><ChevronRight size={14}/>Clients Support</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li onClick={() => navigate("/")}><ChevronRight size={14}/>Home</li>
            <li onClick={() => navigate("/about")}><ChevronRight size={14}/>About</li>
            <li onClick={() => navigate("/properties")}><ChevronRight size={14}/>Properties</li>
            <li onClick={() => navigate("/contact")}><ChevronRight size={14}/>Contact Us</li>
          </ul>
        </div>


        <div className="footer-col">
          <h3>Have a Questions?</h3>

          <div className="contact">
            <MapPin size={16} />
            <p>Lekki, Lagos state, Nigeria</p>
          </div>

          <div className="contact">
            <Phone size={16} />
            <p>+234 906 419 8423</p>
          </div>

          <div className="contact">
            <Mail size={16} />
            <p>oreoluwaolairan@gmail.com</p>
          </div>
        </div>

      </div>


      <div className="footer-bottom">
        <p style={{fontSize:"10px"}}>
          Copyright ©2026 All rights reserved | Built with ❤️ by Rentify
        </p>
      </div>
    </footer>
  );
}

export default Footer;