import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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
  const [showPayment, setShowPayment] = useState(false);
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
    <div className="max-w-md mx-auto">
      <h1 className="mt-5 mb-3" id="purchase-form">
        Ticket Purchase Form
      </h1>

      <h2 className="text-xl font-semibold mb-4">Your Information</h2>
      <Form>
        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <FormField
          label="Phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <FormField
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <div className="row">
          <div className="col-md-6">
            <FormField
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <FormField
              label="Province"
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <FormField
          label="Postal Code"
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
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />

        <div className="d-grid mt-4">
            <Button variant="primary" type="button" className="w-100 mt-3" onClick={handleContinue}>
            Continue to Payment
            </Button>
        </div>
      </Form>
    </div>
  );
}

export default TicketForm;
