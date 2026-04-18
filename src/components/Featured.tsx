import { Bath, BedDouble, Maximize } from "lucide-react";


function Featured() {
  const properties = [
    {
      title: "3 bed Apartment",
      location: "Lekki, Lagos",
      price: "$2,000,000",
      image: "src/assets/Southampton Beach House.jpg",
    },
    {
      title: "Studio apartment",
      location: "Victoria Island,Lagos",
      price: "$1,200,000",
      image: "src/assets/Featured2.jpg",
    },
    {
      title: "Mini Flat",
      location: "Ajah, Lagos",
      price: "$300,000",
      image: "src/assets/Featured3.jpg",
    },
    {
      title: "2 bed apartment",
      location: "Salem, Lagos",
      price: "$300,000",
      image: "src/assets/Featured1.jpg",
    },
  ];

  return (
    <section className="featured">
      <h2>Explore Our Properties</h2>

      <div className="cards">
        {properties.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-img">
              <img src={item.image} alt={item.title} />

              <span className="badge">For Rent</span>
              <span className="price">{item.price}</span>
            </div>

            <div className="card-body">
              <h3>{item.title}</h3>
              <p>{item.location}</p>

              <div className="details">
                <span><BedDouble size={12} /> 3 Beds</span>
                <span><Bath size={12} /> 2 Baths</span>
                <span><Maximize size={12} /> 1200 sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Featured;