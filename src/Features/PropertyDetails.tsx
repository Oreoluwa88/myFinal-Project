import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarone from "../components/Navbarone";
import Navbartwo from "../components/Navbartwo";

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

  if (!property) return <p>Loading...</p>;

 return (
    <>
    <Navbarone />
    <div className="about-hero register-hero">
         <div className="overlay">
             <Navbartwo />

             <div className="hero-text">
                 <p>Property <ChevronRight size={12} />Property Details<ChevronRight size={12} /></p>
                 <h1>View Property</h1>
             </div>
         </div>
     </div>

     <div className="property-details">

             <img src={property.primaryImageUrl} />

             <h1>{property.title}</h1>

             <p className="location">{property.location}</p>

             <p className="price">₦{property.rentAmount}</p>

             <p className="description">{property.description}</p>

             <div className="landlord">
                 <h3>Landlord Info</h3>
                 <p>{property.landlord?.fullName}</p>
                 <p>{property.landlord?.phoneNumber}</p>
                 <p>{property.landlord?.email}</p>
             </div>

         </div></>
);

}

export default PropertyDetails;