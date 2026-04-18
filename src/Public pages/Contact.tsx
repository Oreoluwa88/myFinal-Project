import { ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";


function Contact() {
  return (
    <>
    <Navbarone />
    <div className="about-hero contact-hero">
      <div className="overlay">
        <Navbartwo />
    
        <div className="hero-text">
            <p>Home <ChevronRight size={12}/>Contact<ChevronRight size={12}/></p>
            <h1>Contact us</h1>
        </div>
      </div>
    </div>


    <div className="contact-page">

      <div className="contact-left">
        <h2>Contact us</h2>
        <p className="subtitle">
          We're open for any suggestion or just to have a chat
        </p>

        <div className="contact-info">
          <div>
            <h4>ADDRESS:</h4>
            <p>234 Surulere, Lagos</p>
          </div>

          <div>
            <h4>EMAIL:</h4>
            <p>oreoluwaolabiran@gmail.com</p>
          </div>

          <div>
            <h4>PHONE:</h4>
            <p>+234 906 419 8423</p>
          </div>
        </div>

        <form className="contact-form">
          <input placeholder="Name" />
          <input placeholder="Email" />
          <input placeholder="Subject" />
          <textarea placeholder="Create a message here"></textarea>

          <button type="submit">SEND MESSAGE</button>
        </form>

        <div className="socials">
          <h4 style={{ fontSize: "10px" }}>Follow us here</h4>
          <p style={{ fontSize: "10px" }}>FACEBOOK &nbsp; TWITTER &nbsp; INSTAGRAM &nbsp;</p>
        </div>
      </div>

      <div className="contact-map">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Lekki,Lagos&t=k&z=15&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        ></iframe>
      </div>

    </div>
    <Footer />
    </>
  );
}

export default Contact;