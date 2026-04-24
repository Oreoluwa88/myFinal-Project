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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createLease = async () => {
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

    alert(data.message || "Lease created");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Lease</h2>

      <input name="propertyId" placeholder="Property ID" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="tenantId" placeholder="Tenant ID" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="startDate" type="date" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="endDate" type="date" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="rentAmount" placeholder="Rent Amount" onChange={handleChange} className="border p-2 w-full mb-4" />

      <button onClick={createLease} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Lease
      </button>
    </div>
  );
}

export default CreateLease;