import { Form } from 'react-bootstrap';

function QuantitySelector({ quantity, onQuantityChange }) {
  return (
    <Form.Group className="mb-3" controlId="formBasicQuantity">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        type="number"
        value={quantity}
        onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
        min="1"
      />
      <Form.Text className="text-muted">
        Select the number of tickets you want to purchase.
      </Form.Text>
    </Form.Group>
  );
}

export default QuantitySelector;