import { useContext, useState } from "react";
import { PropertyContext } from "../../pages/PropertyContext";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";




function AddProperty() {
  const { addProperty } = useContext(PropertyContext);

  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Available");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addProperty({
      image: preview,
      title,
      location,
      price,
      status,
      beds: Number(beds),
      baths: Number(baths),
    });


    setPreview("");
    setTitle("");
    setLocation("");
    setPrice("");
    setStatus("Available");
  };

  return (

    <>
    <Navbarone />
    <div className="about-hero addproperties-hero">
      <div className="overlay">
        <Navbartwo />

        <div className="hero-text">
          <p>Home <ChevronRight size={12} />About<ChevronRight size={12} /></p>
          <h1>About Us</h1>
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
              onChange={(e) => setTitle(e.target.value)} />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)} />

            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)} />

            <input
              placeholder="Bedrooms"
              value={beds}
              onChange={(e) => setBeds(e.target.value)} />

            <input
              placeholder="Bathrooms"
              value={baths}
              onChange={(e) => setBaths(e.target.value)} />

            <select
            className="status-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            <option>Available</option>
            <option>Occupied</option>
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