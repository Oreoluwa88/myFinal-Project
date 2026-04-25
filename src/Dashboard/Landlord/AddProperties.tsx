import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Navbarone from "../../components/Navbarone";
import Navbartwo from "../../components/Navbartwo";
import Footer from "../../components/Footer";

function AddProperty() {
  const token = localStorage.getItem("token");

  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !location || !price || !propertyType) {
      alert("Please fill required fields");
      return;
    }

    if (!token) {
      alert("Unauthorized. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();


      formData.append("title", title);
      formData.append(
        "description",
        description || `${beds} bed, ${baths} bath property`
      );
      formData.append("location", location);
      formData.append("address", address || location);
      formData.append("rentAmount", price);
      formData.append("propertyType", propertyType);

      if (file) {
        formData.append("images", file);
      }

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/Properties",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      console.log("Response:", data);

      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Failed to create property");
      }

      alert("Property created successfully!");

      
      setPreview("");
      setFile(null);
      setTitle("");
      setDescription("");
      setLocation("");
      setAddress("");
      setPrice("");
      setPropertyType("");
      setBeds("");
      setBaths("");
    } catch (error: any) {
      console.error("Failed to create property:", error.message);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            <input placeholder="Property Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

            <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />

            <input placeholder="Rent Amount" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

            <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Property Type</option>
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Shop">Shop</option>
              <option value="Land">Land</option>
            </select>

            <input placeholder="Bedrooms" value={beds} onChange={(e) => setBeds(e.target.value)} />

            <input placeholder="Bathrooms" value={baths} onChange={(e) => setBaths(e.target.value)} />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Property..." : "Add Property"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default AddProperty;