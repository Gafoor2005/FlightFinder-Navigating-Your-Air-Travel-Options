const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const { authMiddleware } = require('../middleware/auth');

// Create booking
router.post('/', async (req, res) => {
  try {
    const { userId, flightId, journeyDate, seatCount, seatClass, passengers } = req.body;
    
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    if (flight.availableSeats < seatCount) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    let priceMultiplier = 1;
    if (seatClass === 'business') priceMultiplier = 1.5;
    if (seatClass === 'first') priceMultiplier = 2;

    const totalPrice = flight.basePrice * seatCount * priceMultiplier;

    const booking = new Booking({
      userId,
      flightId,
      journeyDate,
      seatCount,
      seatClass,
      passengers,
      totalPrice
    });

    await booking.save();

    flight.availableSeats -= seatCount;
    await flight.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('flightId')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', '-password')
      .populate('flightId')
      .sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.bookingStatus === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    const flight = await Flight.findById(booking.flightId);
    if (flight) {
      flight.availableSeats += booking.seatCount;
      await flight.save();
    }

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
