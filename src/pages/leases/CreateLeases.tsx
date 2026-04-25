import { useState } from "react";

function CreateLease() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    propertyId: "",
    tenantId: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createLease = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://propms-api.fly.dev/api/v1/Leases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          propertyId: form.propertyId,
          tenantId: form.tenantId,
          startDate: form.startDate,
          endDate: form.endDate,
          rentAmount: Number(form.rentAmount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create lease");
        return;
      }

      setSuccess(data.message || "Lease created successfully");

      // reset form
      setForm({
        propertyId: "",
        tenantId: "",
        startDate: "",
        endDate: "",
        rentAmount: "",
      });

    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lease-form-container">

      <h2 className="form-title">Create Lease</h2>

      {error && <p className="error-msg">{error}</p>}
      {success && <p className="success-msg">{success}</p>}

      <div className="form-grid">

        <input
          name="propertyId"
          placeholder="Property ID"
          value={form.propertyId}
          onChange={handleChange}
        />

        <input
          name="tenantId"
          placeholder="Tenant ID"
          value={form.tenantId}
          onChange={handleChange}
        />

        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />

        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
        />

        <input
          name="rentAmount"
          placeholder="Rent Amount"
          value={form.rentAmount}
          onChange={handleChange}
        />

      </div>

      <button
        onClick={createLease}
        disabled={loading}
        className="submit-btn"
      >
        {loading ? "Creating..." : "Create Lease"}
      </button>

    </div>
  );
}

export default CreateLease;