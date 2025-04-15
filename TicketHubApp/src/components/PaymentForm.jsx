import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormField from "./FormField";

function PaymentForm() {
  const [formData, setFormData] = useState({
    creditCard: "",
    creditExpire: "",
    securityCode: "",
  });
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const quantity = location.state?.quantity || 1;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchaseData = { ...formData, quantity };
    console.log("Submitting Payment Data:", purchaseData);

    try {
      const response = await fetch("YOUR_AZURE_FUNCTION_API_ENDPOINT_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        setPurchaseStatus({
          success: true,
          message: "Thank you for your purchase!",
        });
        setFormData({
          creditCard: "",
          creditExpire: "",
          securityCode: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Payment failed:", response.status, errorData);
        setPurchaseStatus({
          success: false,
          message: `Payment failed: ${response.statusText}`,
        });
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
      setPurchaseStatus({ success: false, message: "Network error occurred during payment." });
    }
  };

  const handleGoBack = () => {
    navigate("/purchase");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="mt-5 mb-3">Payment Information</h1>
      <p className="mb-3">Review your order: {quantity} tickets.</p> 

      <Form onSubmit={handleSubmit}>
        <FormField
          label="Credit Card Number"
          type="text"
          name="creditCard"
          value={formData.creditCard}
          onChange={handleInputChange}
        />
        <div className="row">
          <div className="col-md-6">
            <FormField
              label="Expiration (MM/YY)"
              type="text"
              name="creditExpire"
              value={formData.creditExpire}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <FormField
              label="Security Code"
              type="text"
              name="securityCode"
              value={formData.securityCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button variant="secondary" onClick={handleGoBack} className="mt-3 me-2">
          Go Back
        </Button>
        <Button variant="primary" type="submit" className="mt-3">
          Complete Purchase
        </Button>

        {purchaseStatus && (
          <Alert
            variant={purchaseStatus.success ? "success" : "danger"}
            className="mt-3"
          >
            {purchaseStatus.message}
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default PaymentForm;