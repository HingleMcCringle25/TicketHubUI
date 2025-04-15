import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConcertList from './components/ConcertList';
import PaymentForm from './components/PaymentForm';
import TicketForm from './components/TicketForm';
import "./index.css";

function App() {
  return (
    <BrowserRouter className="center-container">
      <Routes>
        <Route path="/" element={<ConcertList />} />
        <Route path="/purchase" element={<TicketForm />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
