const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightName: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seatCount: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  aircraftType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flight', flightSchema);
