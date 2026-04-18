import { BedDouble, Bath } from "lucide-react";

interface Props {
  image: string;
  title: string;
  location: string;
  price: number | string;
  status: string;
  beds: number;
  baths: number;
}

function PropertyCard({
  image,
  title,
  location,
  price,
  status,
  beds,
  baths,
}: Props) {
  return (
    <div className="property-card">
      
      <div className="card-image">
        <img src={image} alt={title} />

        <span className="price-tag">${price}</span>

        <span
          className={`status-tag ${
            status === "Available" ? "available" : "occupied"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <p className="location">{location}</p>

        <div className="card-icons">
          <span><BedDouble size={16} /> {beds}</span>
          <span><Bath size={16} /> {baths}</span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;