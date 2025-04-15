import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

// Reusable Form Field Component
function FormField({ label, type, name, value, onChange, placeholder }) {
  return (
    <Form.Group className="mb-3" controlId={`formBasic${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

// Reusable Quantity Selector Component
function QuantitySelector({ label, quantity, onQuantityChange }) {
  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex align-items-center">
        <Button variant="outline-secondary" onClick={handleDecrement} className="me-2">
          -
        </Button>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
          min="1"
          className="text-center"
        />
        <Button variant="outline-secondary" onClick={handleIncrement} className="ms-2">
          +
        </Button>
      </div>
    </Form.Group>
  );
}

function TicketForm() {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    creditCard: "",
    creditExpire: "",
    securityCode: "",
  });
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

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
      const response = await fetch("https://nscc-0476765-api-inft4000-eea4agdsath4dae6.canadacentral-01.azurewebsites.net/api/Ticket", {
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
        setStep(3); //Move to a confirmation/success state
      } else {
        const errorData = await response.json();
        console.error("Payment failed:", response.status, errorData);
        setPurchaseStatus({
          success: false,
          message: `Payment failed: ${response.statusText}. Please check your details.`,
        });
        setStep(3); //Move to an error state
      }
    } catch (error) {
      console.error("Error sending payment request:", error);
      setPurchaseStatus({ success: false, message: "Network error occurred during payment. Please try again." });
      setStep(3); //Move to an error state
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Container className="py-5 mx-auto">
      <Row className="w-100 justify-content-md-center">
        <Col md={12} lg={6} className="bg-light p-4 rounded shadow-sm border">
          <h1 className="text-center mb-4 text-primary">Ticket Purchase</h1>

          {step === 1 && (
            <>
              <h5 className="mb-3 text-muted">Your Information</h5>
              <Form>
                <FormField
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Street Address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <Row className="mb-3">
                  <Col md={6}>
                    <FormField
                      label="City"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={6}>
                    <FormField
                      label="Province/State"
                      type="text"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <FormField
                  label="Postal/Zip Code"
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <QuantitySelector
                  label="Number of Tickets"
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                />
                <div className="d-grid mt-4">
                  <Button variant="primary" type="button" className="btn-lg" onClick={nextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </Form>
            </>
          )}

          {step === 2 && (
            <>
              <h5 className="mb-3 text-muted">Payment Information</h5>
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
                  <Button variant="secondary" onClick={prevStep}>
                    Go Back
                  </Button>
                  <Button variant="success" type="submit" className="btn-lg">
                    Complete Purchase
                  </Button>
                </div>
              </Form>
            </>
          )}

          {step === 3 && (
            <div className="text-center">
              {purchaseStatus?.success ? (
                <>
                  <h2 className="text-success mb-3">Thank You!</h2>
                  <p className="mb-3">{purchaseStatus.message}</p>
                  {/* You might want to add a button to go to a confirmation page or homepage */}
                </>
              ) : (
                <>
                  <h2 className="text-danger mb-3">Payment Failed</h2>
                  <p className="mb-3">{purchaseStatus?.message || "An unexpected error occurred."}</p>
                  <Button variant="secondary" onClick={() => setStep(2)}>
                    Go Back to Payment
                  </Button>
                </>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TicketForm;