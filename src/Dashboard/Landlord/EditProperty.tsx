import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbarone from "../../components/Navbarone";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    rentAmount: "",
    propertyType: "",
    beds: "",
    baths: "",
    sqm: "",
  });

  const extractBeds = (desc: string = "") =>
    desc.match(/Beds:(\d+)/)?.[1] || "";

  const extractBaths = (desc: string = "") =>
    desc.match(/Baths:(\d+)/)?.[1] || "";

  const extractSqm = (desc: string = "") =>
    desc.match(/Sqm:(\d+)/)?.[1] || "";

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `https://propms-api.fly.dev/api/v1/Properties/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        const p = data.data;

        setForm({
          title: p.title || "",
          description: p.description || "",
          location: p.location || "",
          address: p.address || "",
          rentAmount: p.rentAmount?.toString() || "",
          propertyType: p.propertyType || "",
          beds: extractBeds(p.description || ""),
          baths: extractBaths(p.description || ""),
          sqm: extractSqm(p.description || ""),
        });
      } catch (err) {
        console.error("Failed to fetch property", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProperty = async () => {
    try {
      const structuredDescription = `
${form.description}

---PROPERTY_DETAILS---
Beds:${form.beds || 0}
Baths:${form.baths || 0}
Sqm:${form.sqm || 0}
`;

      const payload = {
        title: form.title,
        description: structuredDescription,
        location: form.location,
        address: form.address,
        rentAmount: Number(form.rentAmount || 0),
        propertyType: form.propertyType,
      };

      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("UPDATE RESPONSE:", data);

      if (!res.ok || data.success === false) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Property updated successfully");
      navigate("/dashboard/my-properties");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
      <Navbarone />

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Edit Property
        </h2>

        <div className="form-grid" style={{ display: "grid", gap: "10px" }}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <input name="rentAmount" value={form.rentAmount} onChange={handleChange} placeholder="Rent Amount" />

          <select name="propertyType" value={form.propertyType} onChange={handleChange}>
            <option value="">Property Type</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Shop">Shop</option>
            <option value="Land">Land</option>
          </select>

          <input name="beds" value={form.beds} onChange={handleChange} placeholder="Beds" />
          <input name="baths" value={form.baths} onChange={handleChange} placeholder="Baths" />
          <input name="sqm" value={form.sqm} onChange={handleChange} placeholder="Square Meters (sqm)" />

          <button
            onClick={updateProperty}
            style={{
              background: "#2563eb",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Update Property
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProperty;