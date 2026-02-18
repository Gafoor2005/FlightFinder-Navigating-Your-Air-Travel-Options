import React, { useState } from 'react';
import { flightAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: ''
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await flightAPI.search(searchParams);
      setFlights(response.data);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (flightId) => {
    navigate(`/book/${flightId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search Flights</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">From</label>
                <input
                  type="text"
                  className="form-control"
                  name="origin"
                  value={searchParams.origin}
                  onChange={handleChange}
                  placeholder="Origin city"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">To</label>
                <input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={searchParams.destination}
                  onChange={handleChange}
                  placeholder="Destination city"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={searchParams.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search Flights'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {flights.length > 0 && (
        <div>
          <h3 className="mb-3">Available Flights</h3>
          {flights.map((flight) => (
            <div key={flight._id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5>{flight.flightName} ({flight.flightNumber})</h5>
                    <p className="mb-1">
                      <strong>{flight.origin}</strong> → <strong>{flight.destination}</strong>
                    </p>
                    <p className="mb-1">
                      Departure: {new Date(flight.departureTime).toLocaleString()}
                    </p>
                    <p className="mb-1">
                      Arrival: {new Date(flight.arrivalTime).toLocaleString()}
                    </p>
                    <p className="mb-0">
                      Available Seats: {flight.availableSeats} | Aircraft: {flight.aircraftType}
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    <h4 className="text-primary">${flight.basePrice}</h4>
                    <button 
                      className="btn btn-success"
                      onClick={() => handleBook(flight._id)}
                      disabled={flight.availableSeats === 0}
                    >
                      {flight.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {flights.length === 0 && !loading && (
        <div className="text-center text-muted mt-5">
          <p>Search for flights to see available options</p>
        </div>
      )}
    </div>
  );
};

export default Home;
