import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import QuantitySelector from "./QuantitySelector";

function TicketForm() {
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
  });
  const navigate = useNavigate();

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

  const handleContinue = () => {
    navigate("/payment", { state: { quantity } });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-md-center">
        <Col md={8} lg={6} className="bg-light p-4 rounded shadow-sm border">
          <h1 className="text-center mb-4 text-primary">Ticket Purchase</h1>
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
              <Button variant="primary" type="button" className="btn-lg" onClick={handleContinue}>
                Continue to Payment
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TicketForm;
