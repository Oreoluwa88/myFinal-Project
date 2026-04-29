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

          <div className="feature-strip">
            <span><BedDouble size={16} /> {beds} Beds</span>
            <span><Bath size={16} /> {baths} Baths</span>
            <span><Square size={16} /> {sqm} sqm</span>
          </div>

          <div className="info-card">
            <h3>About this property</h3>
            <p>{cleanDesc}</p>
          </div>

          <div className="landlord-card modern">
            <div className="landlord-header">
              <User size={18} />
              <h3>Landlord</h3>
            </div>

            <div className="landlord-body">
              <p>{property.landlord?.fullName}</p>
              <p>{property.landlord?.phoneNumber}</p>
              <p>{property.landlord?.email}</p>
            </div>

            <button className="contact-btn">Contact Landlord</button>
          </div>

          <div>
            <button
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