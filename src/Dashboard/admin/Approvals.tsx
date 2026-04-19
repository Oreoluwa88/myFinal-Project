import { useContext } from "react";
import { PropertyContext } from "../../pages/PropertyContext";

function Approvals() {
  const context = useContext(PropertyContext);
  if (!context) return null;

  const { properties, approveProperty, rejectProperty } = context;

  const pending = properties.filter(
    (p) => p.approval === "Pending"
  );

  return (
    <div>
      <h2>Pending Approvals</h2>

      {pending.length === 0 ? (
        <p>No pending properties</p>
      ) : (
        pending.map((p) => (
          <div key={p.id}>
            <img src={p.image} width="200" />
            <h3>{p.title}</h3>
            <p>{p.location}</p>

            <button onClick={() => approveProperty(p.id)}>
              Approve
            </button>

            <button onClick={() => rejectProperty(p.id)}>
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Approvals;