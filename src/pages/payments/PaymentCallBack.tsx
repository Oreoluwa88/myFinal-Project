import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentCallback() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const reference = new URLSearchParams(window.location.search).get("reference");

      if (!reference) {
        navigate("/payments");
        return;
      }

      try {
        const res = await fetch(
          "https://propms-api.fly.dev/api/v1/Payments/paystack/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reference }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          alert("Payment successful");
          navigate("/dashboard/payment-history");
        } else {
          alert(data.message || "Verification failed");
          navigate("/payments");
        }
      } catch (err) {
        console.error(err);
        navigate("/payments");
      }
    };

    verify();
  }, []);

  return <div>Verifying payment...</div>;
}

export default PaymentCallback;