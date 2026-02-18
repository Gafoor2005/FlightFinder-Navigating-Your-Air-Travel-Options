import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightAPI, bookingAPI, userAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flights');
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddFlight, setShowAddFlight] = useState(false);
  const [newFlight, setNewFlight] = useState({
    flightName: '',
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    seatCount: '',
    basePrice: '',
    aircraftType: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadData();
  }, [user, navigate, activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === 'flights') {
        const response = await flightAPI.getAll();
        setFlights(response.data);
      } else if (activeTab === 'bookings') {
        const response = await bookingAPI.getAll();
        setBookings(response.data);
      } else if (activeTab === 'users') {
        const response = await userAPI.getAllUsers();
        setUsers(response.data);
      }
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    try {
      await flightAPI.create(newFlight);
      alert('Flight added successfully');
      setShowAddFlight(false);
      setNewFlight({
        flightName: '',
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        seatCount: '',
        basePrice: '',
        aircraftType: ''
      });
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add flight');
    }
  };

  const handleDeleteFlight = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      await flightAPI.delete(id);
      alert('Flight deleted successfully');
      loadData();
    } catch (err) {
      alert('Failed to delete flight');
    }
  };

  const handleFlightChange = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </li>
      </ul>

      {activeTab === 'flights' && (
        <div>
          <div className="d-flex justify-content-between mb-3">
            <h4>All Flights</h4>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddFlight(!showAddFlight)}
            >
              {showAddFlight ? 'Cancel' : 'Add Flight'}
            </button>
          </div>

          {showAddFlight && (
            <div className="card mb-4">
              <div className="card-body">
                <h5>Add New Flight</h5>
                <form onSubmit={handleAddFlight}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Flight Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flightName"
                        value={newFlight.flightName}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Flight Number</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flightNumber"
                        value={newFlight.flightNumber}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Origin</label>
                      <input
                        type="text"
                        className="form-control"
                        name="origin"
                        value={newFlight.origin}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Destination</label>
                      <input
                        type="text"
                        className="form-control"
                        name="destination"
                        value={newFlight.destination}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Departure Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="departureTime"
                        value={newFlight.departureTime}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Arrival Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="arrivalTime"
                        value={newFlight.arrivalTime}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Seat Count</label>
                      <input
                        type="number"
                        className="form-control"
                        name="seatCount"
                        value={newFlight.seatCount}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Base Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="basePrice"
                        value={newFlight.basePrice}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Aircraft Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="aircraftType"
                        value={newFlight.aircraftType}
                        onChange={handleFlightChange}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success">Add Flight</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Route</th>
                  <th>Departure</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight._id}>
                    <td>{flight.flightName}<br/><small>{flight.flightNumber}</small></td>
                    <td>{flight.origin} → {flight.destination}</td>
                    <td>{new Date(flight.departureTime).toLocaleString()}</td>
                    <td>{flight.availableSeats}/{flight.seatCount}</td>
                    <td>${flight.basePrice}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteFlight(flight._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div>
          <h4 className="mb-3">All Bookings</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Flight</th>
                  <th>Journey Date</th>
                  <th>Seats</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td><small>{booking._id}</small></td>
                    <td>{booking.userId?.username || 'N/A'}</td>
                    <td>{booking.flightId?.flightNumber || 'N/A'}</td>
                    <td>{new Date(booking.journeyDate).toLocaleDateString()}</td>
                    <td>{booking.seatCount}</td>
                    <td>${booking.totalPrice}</td>
                    <td>
                      <span className={`badge ${booking.bookingStatus === 'confirmed' ? 'bg-success' : 'bg-danger'}`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h4 className="mb-3">All Users</h4>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
