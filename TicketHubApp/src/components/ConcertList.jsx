import { Col, Container, Row } from 'react-bootstrap';
import ConcertCard from './ConcertCard';

function ConcertList() {
    
  const upcomingConcerts = [
    {
      id: 1,
      name: "Arctic Monkeys - Halifax",
      date: "May 10, 2025",
      time: "8:00 PM",
      venue: "Halifax Forum",
      city: "Halifax",
      province: "NS",
      country: "Canada",
    },
    {
      id: 2,
      name: "Arctic Monkeys - Montreal",
      date: "May 12, 2025",
      time: "8:00 PM",
      venue: "Bell Centre",
      city: "Montreal",
      province: "QC",
      country: "Canada",
    },
    {
      id: 3,
      name: "Arctic Monkeys - Toronto",
      date: "May 14, 2025",
      time: "8:00 PM",
      venue: "Scotiabank Arena",
      city: "Toronto",
      province: "ON",
      country: "Canada",
    },
  ];
  console.log("Upcoming Concerts:", upcomingConcerts);
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Upcoming Arctic Monkeys Concerts</h1>
      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        {upcomingConcerts.map(concert => (
          <Col key={concert.id} className="mb-4" >
            <ConcertCard concert={concert} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ConcertList;