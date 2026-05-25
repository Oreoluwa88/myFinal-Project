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
  console.log(property.images);

  const { beds, baths, sqm, cleanDesc } = extractDetails(property.description);


  return (
  <>
    <Navbarone />

    <div className="property-details-page">

      <div className="property-main-card">

        <div className="property-image-section">

          <img
            src={property.primaryImageUrl}
            alt={property.title}
            className="main-property-image"
          />

          <div className="image-overlay"></div>

          

          <div className="image-bottom-content">

            <div className="landlord-overlay-card">

              <div className="landlord-avatar">
                <User size={28} />
              </div>

              <div className="landlord-info">
                <h3>{property.landlord?.fullName}</h3>

                <p>{property.landlord?.email}</p>

                <p>{property.landlord?.phoneNumber}</p>
              </div>

            </div>

            <div className="property-overlay-details">

              <h1>{property.title}</h1>

              <p className="overlay-location">
                <MapPin size={15} />
                {property.location}
              </p>

              <div className="overlay-features">

                <span>
                  <BedDouble size={15} />
                  {beds} Bedrooms
                </span>

                <span>
                  <Bath size={15} />
                  {baths} Bathrooms
                </span>

                <span>
                  <Square size={15} />
                  {sqm} sqm
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="property-bottom-section">

          <div className="description-section">

            <h2>Description</h2>

            <p>{cleanDesc}</p>

          </div>

          <div className="price-card">

            <h3>Price</h3>

            <div className="big-price">
              ₦{Number(property.rentAmount).toLocaleString()}
            </div>

            <span>/Year</span>

            <button
              className="lease-request-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(property.id);
                setOpenModal(true);
              }}
            >
              Request Lease
            </button>

          </div>
          <div className="gallery-section">

            <h2>Gallery</h2>

            <div className="gallery-grid">

              {property.images?.map((img: any, index: number) => (

                <div className="gallery-item" key={index}>

                  <img
                    src={img.imageUrl || img.url || img}
                    alt={`gallery-${index}`}
                  />

                </div>

              ))}

            </div>

          </div>

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