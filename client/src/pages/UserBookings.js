import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings(user.userId);
      setBookings(response.data);
    } catch (err) {
      console.error('Failed to load bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await bookingAPI.cancel(bookingId);
      alert('Booking cancelled successfully');
      loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="alert alert-info">No bookings found</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h5>
                    {booking.flightId?.flightName || 'N/A'} ({booking.flightId?.flightNumber || 'N/A'})
                  </h5>
                  <p className="mb-1">
                    <strong>Route:</strong> {booking.flightId?.origin} → {booking.flightId?.destination}
                  </p>
                  <p className="mb-1">
                    <strong>Journey Date:</strong> {new Date(booking.journeyDate).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Seats:</strong> {booking.seatCount} | <strong>Class:</strong> {booking.seatClass}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> 
                    <span className={`badge ms-2 ${booking.bookingStatus === 'confirmed' ? 'bg-success' : 'bg-danger'}`}>
                      {booking.bookingStatus}
                    </span>
                  </p>
                  <p className="mb-0">
                    <strong>Passengers:</strong>
                  </p>
                  <ul className="mb-0">
                    {booking.passengers?.map((p, i) => (
                      <li key={i}>{p.name}, {p.age} years, {p.gender}</li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-4 text-end">
                  <h4 className="text-primary">${booking.totalPrice}</h4>
                  {booking.bookingStatus === 'confirmed' && (
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserBookings;
