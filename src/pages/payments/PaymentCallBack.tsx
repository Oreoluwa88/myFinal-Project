import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentCallback() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = new URLSearchParams(window.location.search).get(
        "reference"
      );

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
              Accept: "application/json",
            },
            body: JSON.stringify({ reference }),
          }
        );

        const data = await res.json();

        console.log("VERIFY RESPONSE:", data);

        if (res.ok) {
          alert("Payment successful!");
          navigate("/payments/history");
        } else {
          alert(data?.message || "Payment verification failed");
          navigate("/payments");
        }
      } catch (err) {
        console.error(err);
        alert("Verification error");
        navigate("/payments");
      }
    };

    verifyPayment();
  }, []);

  return <div>Verifying payment...</div>;
}

export default PaymentCallback;