import { ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import { useNavigate } from "react-router-dom";


function About() {
  const navigate = useNavigate();
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [count4, setCount4] = useState(0);
  const [start, setStart] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  if (!start) return;

  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  let c4 = 0;

  const interval = setInterval(() => {
    if (c1 < 50) {
      c1 += 1;
      setCount1(c1);
    }

    if (c2 < 210) {
      c2 += 3; 
      setCount2(c2);
    }

    if (c3 < 450) {
      c3 += 5;
      setCount3(c3);
    }

    if (c4 < 30) {
      c4 += 1;
      setCount4(c4);
    }

    if (c1 >= 50 && c2 >= 210 && c3 >= 450 && c4 >= 30) {
      clearInterval(interval);
    }
  }, 40); 

  return () => clearInterval(interval);
}, [start]);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setStart(true);
      }
    },
    { threshold: 0.5 }
  );

  if (statsRef.current) {
    observer.observe(statsRef.current);
  }

  return () => {
    if (statsRef.current) {
      observer.unobserve(statsRef.current);
    }
  };
}, []);
  const [current, setCurrent] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 3000);

    return () => clearInterval(interval);
    }, []);
  const testimonials = [
  {
    name: "Jane Doe",
    role: "Tenant",
    image: "/images/client1.jpg",
    text: "Finding a home was so easy with RentEase!",
  },
  {
    name: "Adaeze Okafor",
    role: "Landlord",
    image: "/images/client2.jpg",
    text: "Managing my properties is now stress-free.",
  },
  {
    name: "Ibrahim Musa",
    role: "Investor",
    image: "/images/client3.jpg",
    text: "Best platform for landlords and tenants.",
  },
  {
    name: "Chioma Nwoye",
    role: "Tenant",
    image: "/images/client4.jpg",
    text: "Very smooth experience from start to finish.",
  },
  /*
  {
    name: "Tunde Balogun",
    role: "Landlord",
    image: "/images/client5.jpg",
    text: "Tracking rent payments has never been easier.",
  },
  {
    name: "Fatima Bello",
    role: "Agent",
    image: "/images/agent3.jpg",
    text: "I recommend this platform to all my clients.",
  },*/
  
];
  return (
    <>
    <div className="about">
      
      <Navbarone/>
      <div className="about-hero">
        <div className="overlay">
          <Navbartwo />

        <div className="hero-text">
          <p>Home <ChevronRight size={12}/>About<ChevronRight size={12}/></p>
          <h1>About Us</h1>
        </div>
        </div>
      </div>


      <section className="about-section">
        <div className="about-img">
          <img src="/images/aboutimg 1.jpg" alt="about" />
        </div>
        <div className="about-before">
          <div className="about-text">
            <p style={{ color: "green" }}>About us</p>
            <h2>We Help You Find Your Dream Home</h2>
            <p>
              Rentify is a property management platform designed to help landlords
              manage properties and tenants easily, while helping tenants find
              suitable homes without stress.
            </p>

            <p>
              Our system simplifies rent tracking, property listing, and tenant
              management all in one place.
            </p>

            <button onClick={() => navigate("/contact")}>Learn More</button>
          </div>
          <div className="stats" ref={statsRef}>
            <div>
              <h2>{count1}</h2>
              <p>Years of Experience</p>
            </div>

            <div>
              <h2>{count2}k+</h2>
              <p>Total Properties</p>
            </div>

            <div>
              <h2>{count3}</h2>
              <p>Qualified Realtors</p>
            </div>

            <div>
              <h2>{count4}</h2>
              <p>Total Branches</p>
            </div>
          </div>
          <div className="about-img2">
            <img src="/images/22 Indoor Concrete Floor Paint Ideas for Modern Spaces.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="audience">
        <h2>Built for Everyone in Real Estate</h2>

        <div className="audience-grid">
          <div>
            <h3>🏠 Landlords</h3>
            <p>List properties, manage tenants, track rent.</p>
          </div>

          <div>
            <h3>🧑‍💼 Tenants</h3>
            <p>Find homes and track rent payments easily.</p>
          </div>

          <div>
            <h3>🛠 Admin</h3>
            <p>Approve listings and manage the platform.</p>
          </div>
        </div>
      </section>

      <section className="problem-solution">
        <h2>The Problem We Solve</h2>

        <div className="ps-box">
          <div>
            <h3>❌ The Problem</h3>
            <p>
              Property management is still manual, messy, and unorganized.
            </p>
          </div>

          <div>
            <h3>✅ Our Solution</h3>
            <p>
              Rentify centralizes property listings, tenants, and rent tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How Rentify Works</h2>

        <div className="steps">
          <div>
            <h3>1. Register</h3>
            <p>Create an account as landlord or tenant.</p>
          </div>

          <div>
            <h3>2. Use Platform</h3>
            <p>List or search properties easily.</p>
          </div>

          <div>
            <h3>3. Manage Everything</h3>
            <p>Track rent, tenants, and properties.</p>
          </div>
        </div>
      </section>


      <section className="why">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>Trusted Platform</h3>
            <p>Secure and reliable property management system.</p>
          </div>

          <div className="why-card">
            <h3>Easy to Use</h3>
            <p>Simple interface for landlords and tenants.</p>
          </div>

          <div className="why-card">
            <h3>Fast Process</h3>
            <p>Quick property listing and rent tracking.</p>
          </div>
        </div>
      </section>

      <section className="agents">
        <h2>Our Agents</h2>

        <div className="agents-grid">

          <div className="agent-card">
            <img src="/images/agent1.jpg" />
            <div className="agent-info">
              <p>Listing • 10 Properties</p>
              <h3>Mike Bochs</h3>
              <span>Senior Property Consultant</span>
            </div>
          </div>

          <div className="agent-card">
            <img src="/images/agent2.jpg" />
            <div className="agent-info">
              <p>Listing • 8 Properties</p>
              <h3>Sarah Geronimo </h3>
              <span>Luxury Property Specialist</span>
            </div>
          </div>

          <div className="agent-card">
            <img src="/images/agent3.jpg" />
            <div className="agent-info">
              <p>Listing • 12 Properties</p>
              <h3>Jessica Moore</h3>
              <span>Rental Expert</span>
            </div>
          </div>

          <div className="agent-card">
            <img src="/images/agent4.jpg" />
            <div className="agent-info">
              <p>Listing • 9 Properties</p>
              <h3>David Smith</h3>
              <span>Client Relations Manager</span>
            </div>
          </div>

        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>

        <div className="slider">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`test-card ${index === current ? "active" : ""}`}
            >
              <Quote className="quote-icon" />

              <div className="test-top">
                <img src={item.image} />
                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>

              <p>"{item.text}"</p>

              <div className="stars">
                <Star size={16} /><Star size={16} /><Star size={16} />
                <Star size={16} /><Star size={16} />
              </div>
            </div>
          ))}

        </div>
      </section>


      <section className="cta">
        <h2>Start Managing Properties Today</h2>
        <button onClick={() => navigate("/register")}> Get Started</button>
      </section>

    </div>
    <Footer />
    </>
  );
}

export default About;