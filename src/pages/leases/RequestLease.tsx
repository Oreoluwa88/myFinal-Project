import { useState } from "react";

interface Props {
  propertyId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

function RequestLeaseModal({ propertyId, onClose, onSuccess }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(
        "https://propms-api.fly.dev/api/v1/lease-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            propertyId,
            message,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Request failed");
        return;
      }

      alert("Lease request sent");
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Request Lease</h3>

        <textarea
          placeholder="Write a message to landlord..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textarea}
        />

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button onClick={onClose} style={btnGray}>
            Cancel
          </button>

          <button onClick={sendRequest} style={btnBlack}>
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestLeaseModal;

const overlay: any = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal: any = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "350px",
};

const textarea: any = {
  width: "100%",
  height: "80px",
  marginTop: "10px",
};

const btnBlack: any = {
  background: "black",
  color: "white",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
};

const btnGray: any = {
  background: "#e5e7eb",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
};