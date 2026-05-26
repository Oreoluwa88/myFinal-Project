import { BedDouble, Bath, Ruler } from "lucide-react";

interface Props {
  image: string;
  title: string;
  location: string;
  price: number | string;
  status: string;
  propertyType?: string;
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
  propertyType,
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
      alt={title}
    />

    <div className="favorite-btn">
      <span
          className={`status-tag ${
            formattedStatus === "AVAILABLE"
              ? "property-available"
              : "property-occupied"
          }`}
        >
          {formattedStatus}
        </span>
    </div>

    <div className="bottom-tags">
      <span className="property-type">
        {propertyType || "Apartment"}
      </span>
    </div>

  </div>

  <div className="details-row">

    <div>
      <BedDouble size={16} />
      <span>{beds} Beds</span>
    </div>

    <div>
      <Bath size={16} />
      <span>{baths} Baths</span>
    </div>

    <div>
      <Ruler size={16} />
      <span>{sqm} m²</span>
    </div>

  </div>

  <div className="card-content">

    <div className="property-price">
      ₦{safePrice}
      <span>/yr</span>
    </div>

    <div className="text-content">
      <h3>{title}</h3>
      <p>{location}</p>
    </div>

  </div>

</div>

  );
}

export default PropertyCard;