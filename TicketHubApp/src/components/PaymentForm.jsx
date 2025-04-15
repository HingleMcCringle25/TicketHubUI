import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
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
          message: "Payment successful! Your tickets are on their way.",
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
          message: `Payment failed: ${response.statusText}. Please check your details.`,
        });
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
      setPurchaseStatus({ success: false, message: "Network error occurred during payment. Please try again." });
    }
  };

  const handleGoBack = () => {
    navigate("/purchase");
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6} className="bg-light p-4 rounded shadow-sm border">
          <h1 className="text-center mb-4 text-success">Payment Information</h1>
          <p className="mb-3 text-muted">Reviewing your order: <span className="fw-bold">{quantity}</span> tickets.</p> 

          <Form onSubmit={handleSubmit}>
            <FormField
              label="Credit Card Number"
              type="text"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
            />
            <Row className="mb-3">
              <Col md={6}>
                <FormField
                  label="Expiration (MM/YY)"
                  type="text"
                  name="creditExpire"
                  placeholder="MM/YY"
                  value={formData.creditExpire}
                  onChange={handleInputChange}
                />
              </Col>
              <Col md={6}>
                <FormField
                  label="Security Code (CVV)"
                  type="text"
                  name="securityCode"
                  placeholder="CVV"
                  value={formData.securityCode}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={handleGoBack}>
                Go Back
              </Button>
              <Button variant="success" type="submit" className="btn-lg">
                Complete Purchase
              </Button>
            </div>

            {purchaseStatus && (
              <Alert
                variant={purchaseStatus.success ? "success" : "danger"}
                className="mt-3"
              >
                {purchaseStatus.message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentForm;