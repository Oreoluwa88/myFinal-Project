import { useContext, useState } from "react";
import { PropertyContext } from "../../pages/PropertyContext";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

function AddProperty() {
  const context = useContext(PropertyContext);
  if (!context) return null;

  const { addProperty } = context;

  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState<"Available" | "Occupied">("Available");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !price) return;

    addProperty({
      image: preview || "/placeholder.jpg",
      title,
      location,
      price: Number(price),
      status,
      beds: Number(beds) || 0,
      baths: Number(baths) || 0,
    });

    setPreview("");
    setTitle("");
    setLocation("");
    setPrice("");
    setStatus("Available");
    setBeds("");
    setBaths("");
  };

  return (
    <>
      <Navbarone />

      <div className="about-hero addproperties-hero">
        <div className="overlay">
          <Navbartwo />

          <div className="hero-text">
            <p>
              Home <ChevronRight size={12} /> Add Property
              <ChevronRight size={12} />
            </p>
            <h1>Add Property</h1>
          </div>
        </div>
      </div>

      <div className="addproperty-wrapper">
        <form onSubmit={handleSubmit} className="addproperty-form">
          <h2 style={{ textAlign: "center" }}>Add Property</h2>

          <label className="upload-box">
            <input type="file" onChange={handleImage} hidden />

            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <span>Click to upload image</span>
            )}
          </label>

          <div className="form-grid">
            <input
              placeholder="Property Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              placeholder="Bedrooms"
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />

            <input
              placeholder="Bathrooms"
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />

            <select
              className="status-select"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Available" | "Occupied")
              }
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Property
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default AddProperty;