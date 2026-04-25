import { ChevronRight, MapPin, Home, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";
import Footer from "../components/Footer";
import "./PropertyDetails.css";

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

  if (!property) return <p className="loading">Loading...</p>;

  return (
    <>
      <Navbarone />

      <div className="details-hero">
        <Navbartwo />
        <img src={property.primaryImageUrl} className="hero-image" />
      </div>

      <div className="details-container">

    
        <div className="details-left">

          <h1>{property.title}</h1>

          <p className="location">
            <MapPin size={14} /> {property.location}
          </p>

          <p className="price">₦{property.rentAmount}</p>

          <div className="desc">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="meta">
            <p><Home size={14} /> {property.propertyType}</p>
            <p>Status: {property.status}</p>
            <p>Created: {new Date(property.createdDate).toDateString()}</p>
          </div>

        </div>

    
        <div className="details-right">

          <div className="landlord-card">

            <div className="landlord-header">
              <User />
              <h3>Landlord</h3>
            </div>

            <p>{property.landlord?.fullName}</p>
            <p>{property.landlord?.phoneNumber}</p>
            <p>{property.landlord?.email}</p>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default PropertyDetails;