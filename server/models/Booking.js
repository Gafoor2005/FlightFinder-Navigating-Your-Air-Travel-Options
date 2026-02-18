const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  bookingDate: { type: Date, default: Date.now },
  journeyDate: { type: Date, required: true },
  seatCount: { type: Number, required: true },
  seatClass: { type: String, enum: ['economy', 'business', 'first'], default: 'economy' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  passengers: [{ 
    name: String, 
    age: Number, 
    gender: String 
  }],
  totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
