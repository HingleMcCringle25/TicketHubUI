import { Form } from 'react-bootstrap';

function FormField({ label, type, name, value, onChange }) {
  return (
    <Form.Group className="mb-3" controlId={`formBasic${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter your ${label}`}
      />
    </Form.Group>
  );
}

export default FormField;