import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { flightAPI, bookingAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const BookFlight = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [bookingData, setBookingData] = useState({
    seatCount: 1,
    seatClass: 'economy',
    journeyDate: '',
    passengers: [{ name: '', age: '', gender: '' }]
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadFlight();
  }, [id, user, navigate]);

  const loadFlight = async () => {
    try {
      const response = await flightAPI.getById(id);
      setFlight(response.data);
    } catch (err) {
      setError('Failed to load flight details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'seatCount') {
      const count = parseInt(value);
      const newPassengers = Array(count).fill(null).map((_, i) => 
        bookingData.passengers[i] || { name: '', age: '', gender: '' }
      );
      setBookingData({ ...bookingData, seatCount: count, passengers: newPassengers });
    } else {
      setBookingData({ ...bookingData, [name]: value });
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...bookingData.passengers];
    newPassengers[index][field] = value;
    setBookingData({ ...bookingData, passengers: newPassengers });
  };

  const calculatePrice = () => {
    if (!flight) return 0;
    let multiplier = 1;
    if (bookingData.seatClass === 'business') multiplier = 1.5;
    if (bookingData.seatClass === 'first') multiplier = 2;
    return (flight.basePrice * bookingData.seatCount * multiplier).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bookingAPI.create({
        userId: user.userId,
        flightId: id,
        ...bookingData
      });
      alert('Booking confirmed!');
      navigate('/bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (!flight) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Flight</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h4>{flight.flightName} ({flight.flightNumber})</h4>
          <p><strong>Route:</strong> {flight.origin} → {flight.destination}</p>
          <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
          <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>
          <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
          <p><strong>Base Price:</strong> ${flight.basePrice}</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h5>Booking Details</h5>
            <div className="row g-3 mt-2">
              <div className="col-md-4">
                <label className="form-label">Journey Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="journeyDate"
                  value={bookingData.journeyDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Number of Seats</label>
                <input
                  type="number"
                  className="form-control"
                  name="seatCount"
                  min="1"
                  max={flight.availableSeats}
                  value={bookingData.seatCount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Class</label>
                <select
                  className="form-control"
                  name="seatClass"
                  value={bookingData.seatClass}
                  onChange={handleChange}
                  required
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business (1.5x)</option>
                  <option value="first">First Class (2x)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5>Passenger Details</h5>
            {bookingData.passengers.map((passenger, index) => (
              <div key={index} className="border-bottom pb-3 mb-3">
                <h6>Passenger {index + 1}</h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={passenger.name}
                      onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-control"
                      value={passenger.age}
                      onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-control"
                      value={passenger.gender}
                      onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            <h5>Total Price: ${calculatePrice()}</h5>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookFlight;
