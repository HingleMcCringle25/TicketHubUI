import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConcertCard({ concert }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5" className="mb-2">{concert.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">{concert.date} - {concert.time}</Card.Subtitle>
        <Card.Text className="mb-auto">
          {concert.venue}, {concert.city}, {concert.province}, {concert.country}
        </Card.Text>
        <Button variant="primary" as={Link} to="/purchase">Buy Tickets</Button>
      </Card.Body>
    </Card>
  );
}

export default ConcertCard;