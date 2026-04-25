import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  });

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
          rentAmount: p.rentAmount || "",
          propertyType: p.propertyType || "",
          beds: p.beds || "",
          baths: p.baths || "",
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
      const res = await fetch(
        `https://propms-api.fly.dev/api/v1/Properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            rentAmount: Number(form.rentAmount),
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
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
    <div>
    <h2 className="form-grid">Edit Property</h2>
    <div className="form-grid">


      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 w-full mb-2" />

      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 w-full mb-2" />

      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 w-full mb-2" />

      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full mb-2" />

      <input name="rentAmount" value={form.rentAmount} onChange={handleChange} placeholder="Rent Amount" className="border p-2 w-full mb-2" />

      <select
        name="propertyType"
        value={form.propertyType}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      >
        <option value="">Property Type</option>
        <option value="House">House</option>
        <option value="Apartment">Apartment</option>
        <option value="Shop">Shop</option>
        <option value="Land">Land</option>
      </select>

      <input name="beds" value={form.beds} onChange={handleChange} placeholder="Beds" className="border p-2 w-full mb-2" />

      <input name="baths" value={form.baths} onChange={handleChange} placeholder="Baths" className="border p-2 w-full mb-4" />

      <button
        onClick={updateProperty}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Update Property
      </button>
    </div>
    </div>
  );
}

export default EditProperty;