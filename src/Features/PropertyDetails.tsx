import { MapPin, Home, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";


function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Properties/${id}`
      );

      const data = await res.json();
      setProperty(data.data);
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p className="loading" style={{fontSize:"16px", fontWeight:"bold"}}>Loading...</p>;

  return (
    <>

    <Navbarone />
      <div className="details-wrapper">

  <div className="details-image">
    <img src={property.primaryImageUrl} alt="" />

    <div className="price-badge">
      ₦{property.rentAmount} <span style={{fontSize:"10px"}}>/Annum</span>
    </div>
  </div>


  <div className="details-content">

    <h1>{property.title}</h1>

    <p className="location">
      <MapPin size={16} /> {property.location}
    </p>

  
    <div className="meta-badges">
      <span><Home size={14} /> {property.propertyType}</span>
      <span className="status">{property.status}</span>
      <span>{new Date(property.createdDate).toDateString()}</span>
    </div>

    <div className="info-card">
      <h3>About this property</h3>
      <p>{property.description}</p>
    </div>


    <div className="landlord-card modern">

      <div className="landlord-header">
        <User size={18} />
        <h3>Landlord</h3>
      </div>

      <div className="landlord-body">
        <p className="name">{property.landlord?.fullName}</p>
        <p>{property.landlord?.phoneNumber}</p>
        <p>{property.landlord?.email}</p>
      </div>

      <button className="contact-btn">Contact Landlord</button>

    </div>

  </div>

</div>

      <Footer />
    </>
  );
}

export default PropertyDetails;