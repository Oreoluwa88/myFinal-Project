import { Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQSection from "./Faq";

function Featuredabout (){
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
    text: "Finding a home was so easy with Rentify!",
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
  /*
  {
    name: "Chioma Nwoye",
    role: "Tenant",
    image: "/images/client4.jpg",
    text: "Very smooth experience from start to finish.",
  },
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
        <section className="about-section">
        <div className="about-img">
          <img src="/images/aboutimg 1.jpg" alt="about" />
        </div>
        <div className="about-before">
        <div className="about-text">
          <p style={{color:"green"}}>About us</p>
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
          <h2>Built for Modern Renting</h2>
          <p className="audience-sub">
            Everything landlords and tenants need — in one seamless platform
          </p>

          <div className="audience-grid">

            <div className="audience-card landlord">
              <h3>🏠 For Landlords</h3>

              <ul>
                <li>✔ List and manage multiple properties</li>
                <li>✔ Track rent payments in real time</li>
                <li>✔ Approve or reject tenant requests</li>
                <li>✔ Automatically generate leases</li>
                <li>✔ View income and payment history</li>
              </ul>

              <button className="audience-btn" onClick={() => navigate("./login")}>Manage Properties</button>
            </div>

            <div className="audience-card tenant">
              <h3>🧑‍💼 For Tenants</h3>

              <ul>
                <li>✔ Browse and request properties</li>
                <li>✔ Pay rent securely online</li>
                <li>✔ Track payment history & receipts</li>
                <li>✔ View lease details anytime</li>
                <li>✔ Get clear due dates & reminders</li>
              </ul>

              <button className="audience-btn" onClick={() => navigate("./login")}>Find a Home</button>
            </div>

          </div>
        </section>

        <FAQSection/>

            <section className="how-it-works">
        <h2>How Rentify Works</h2>
        <p className="hiw-sub">
          Simple steps to manage renting from start to finish
        </p>

        <div className="timeline">

          <div className="timeline-item">
            <div className="circle">1</div>
            <h3>Create Account</h3>
            <p>Sign up as a landlord or tenant in seconds.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">2</div>
            <h3>Explore Platform</h3>
            <p>List properties or browse available homes.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">3</div>
            <h3>Connect & Approve</h3>
            <p>Send requests, review tenants, and approve leases.</p>
          </div>

          <div className="timeline-item">
            <div className="circle">4</div>
            <h3>Manage & Pay</h3>
            <p>Track rent, payments, and lease activity easily.</p>
          </div>

        </div>
      </section>

      
      <section className="why">
  <h2>Why Choose Rentify</h2>
  <p className="why-sub">
    Built to simplify renting for everyone involved
  </p>

  <div className="why-container">

    <div className="why-item">
      <div className="why-icon">🔐</div>
      <div>
        <h3>Secure & Trusted</h3>
        <p>All payments and data are protected with modern security standards.</p>
      </div>
    </div>

    <div className="why-item">
      <div className="why-icon">⚡</div>
      <div>
        <h3>Fast & Efficient</h3>
        <p>Automate leases, payments, and tracking in just a few clicks.</p>
      </div>
    </div>

    <div className="why-item">
      <div className="why-icon">🎯</div>
      <div>
        <h3>Simple Experience</h3>
        <p>Clean interface designed for both landlords and tenants.</p>
      </div>
    </div>

  </div>
</section>


<section className="testimonials">
  <p>Testimonials</p>
  <h2>What Our Clients Say</h2>
  <p>Our verified users on what changes when Rentify actually vets everyone</p>

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
        <button onClick={() => navigate("/register")}>Get Started</button>
      </section>

</>
    )
}

export default Featuredabout