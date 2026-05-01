import { BedDouble, Bath, Ruler } from "lucide-react";

interface Props {
  image: string;
  title: string;
  location: string;
  price: number | string;
  status: string;
  beds?: number | string;
  baths?: number | string;
  sqm?: number | string;
}

function PropertyCard({
  image,
  title,
  location,
  price,
  status,
  beds = 0,
  baths = 0,
  sqm = 0,
}: Props) {
  const formattedStatus =
    status?.toLowerCase() === "occupied"
      ? "OCCUPIED"
      : "AVAILABLE";

  const safePrice =
    price ? Number(price).toLocaleString() : "0";

  return (
    <div className="property-card">
      <div className="card-image">
        <img
          src={image || "/placeholder.jpg"}
          alt={title || "Property image"}
        />

        <span className="price-tag">
          ₦{safePrice}
        </span>

        <span className={`status-tag ${formattedStatus.toLowerCase()}`}>
          {formattedStatus}
        </span>
      </div>

      <div className="card-content">
        <h3>{title || "Untitled Property"}</h3>
        <p className="location">{location || "No location"}</p>

        <div className="card-icons" style={{fontSize:"10px", fontWeight:"bold"}}>
          <span>
            <BedDouble size={13} /> {beds || 0}
          </span>

          <span>
            <Bath size={13} /> {baths || 0}
          </span>

          <span>
            <Ruler size={13} /> {sqm || 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;