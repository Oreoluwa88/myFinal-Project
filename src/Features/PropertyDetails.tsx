import { MapPin, User, BedDouble, Bath, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbarone from "../components/Navbarone";
import RequestLease from "../pages/leases/RequestLease";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
const [selectedId, setSelectedId] = useState("");

  const extractDetails = (desc: string = "") => {
    const beds = desc.match(/Beds\s*:\s*(\d+)/i)?.[1] || "0";
    const baths = desc.match(/Baths\s*:\s*(\d+)/i)?.[1] || "0";
    const sqm = desc.match(/Sqm\s*:\s*(\d+)/i)?.[1] || "0";

    const cleanDesc =
      desc.split("---PROPERTY_DETAILS---")[0] || desc;

    return { beds, baths, sqm, cleanDesc };
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `https://propms-api.fly.dev/api/v1/Properties/${id}`
        );

        const data = await res.json();

        setProperty(
          data?.data?.data ||
          data?.data ||
          data
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  const { beds, baths, sqm, cleanDesc } = extractDetails(property.description);


  return (
    <>
      <Navbarone />

      <div className="details-wrapper">

        <div className="details-image">
          <img src={property.primaryImageUrl} />

          <div className="price-badge">
            ₦{Number(property.rentAmount).toLocaleString()}
            <span style={{ fontSize: "10px" }}> /Annum</span>
          </div>

        </div>

        <div className="details-content">
          <h1>{property.title}</h1>

          <p className="location">
            <MapPin size={16} /> {property.location}
          </p>

          <div className="feature-strip" style={{display:"flex", justifyContent:"start", gap:"10px", marginTop:"20px"}}>
            <span><BedDouble size={16} /> {beds} Beds</span>
            <span><Bath size={16} /> {baths} Baths</span>
            <span><Square size={16} /> {sqm} sqm</span>
          </div>

          <div className="info-card" style={{marginTop:"20px", border:"1px solid blue"}}>
            <h3 style={{marginBottom:"20px", textAlign:"center", }}>About this property</h3>
            <p>{cleanDesc}</p>
          </div>

          <div className="landlord-card modern">
            <div className="landlord-header">
              <User size={18} />
              <h3>Landlord</h3>
            </div>

            <div className="landlord-body">
              <p style={{fontWeight:"bold"}}>{property.landlord?.fullName}</p>
              <p style={{fontSize:"13px"}}>{property.landlord?.phoneNumber}</p>
              <p style={{fontSize:"13px"}}>{property.landlord?.email}</p>
            </div>

            <button className="contact-btn">Contact Landlord</button>
          </div>

          <div style={{display:"flex", justifyContent:"center", marginTop:"50px"}}>
            <button style={{backgroundColor:"black", color:"white", padding:"10px 20px", borderRadius:"10px"}}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(property.id);
                setOpenModal(true);
              }}
            >
              Request Lease
            </button>
          </div>
        </div>
      </div>

      <Footer />
      {openModal && (
      <RequestLease
        propertyId={selectedId}
        onClose={() => setOpenModal(false)}
      />
    )}
    </>
  );
}

export default PropertyDetails;