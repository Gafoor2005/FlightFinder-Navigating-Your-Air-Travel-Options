const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');
const Flight = require('./models/Flight');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Flight.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@flight.com',
      password: adminPassword,
      phone: '1234567890',
      address: 'Admin Office',
      role: 'admin'
    });
    console.log('Admin user created (email: admin@flight.com, password: admin123)');

    // Create sample user
    const userPassword = await bcrypt.hash('user123', 10);
    await User.create({
      username: 'john',
      email: 'john@email.com',
      password: userPassword,
      phone: '9876543210',
      address: '123 Main St',
      role: 'user'
    });
    console.log('Sample user created (email: john@email.com, password: user123)');

    // Create sample flights
    const flights = [
      {
        flightName: 'Air India',
        flightNumber: 'AI101',
        origin: 'Delhi',
        destination: 'Mumbai',
        departureTime: new Date('2026-03-01T08:00:00'),
        arrivalTime: new Date('2026-03-01T10:30:00'),
        seatCount: 180,
        availableSeats: 180,
        basePrice: 5000,
        aircraftType: 'Boeing 737'
      },
      {
        flightName: 'IndiGo',
        flightNumber: '6E202',
        origin: 'Mumbai',
        destination: 'Bangalore',
        departureTime: new Date('2026-03-01T12:00:00'),
        arrivalTime: new Date('2026-03-01T13:30:00'),
        seatCount: 150,
        availableSeats: 150,
        basePrice: 4500,
        aircraftType: 'Airbus A320'
      },
      {
        flightName: 'SpiceJet',
        flightNumber: 'SG303',
        origin: 'Delhi',
        destination: 'Kolkata',
        departureTime: new Date('2026-03-02T06:00:00'),
        arrivalTime: new Date('2026-03-02T08:30:00'),
        seatCount: 160,
        availableSeats: 160,
        basePrice: 4800,
        aircraftType: 'Boeing 737'
      },
      {
        flightName: 'Vistara',
        flightNumber: 'UK404',
        origin: 'Bangalore',
        destination: 'Hyderabad',
        departureTime: new Date('2026-03-02T14:00:00'),
        arrivalTime: new Date('2026-03-02T15:00:00'),
        seatCount: 140,
        availableSeats: 140,
        basePrice: 3500,
        aircraftType: 'Airbus A320'
      },
      {
        flightName: 'Air India',
        flightNumber: 'AI505',
        origin: 'Mumbai',
        destination: 'Chennai',
        departureTime: new Date('2026-03-03T09:00:00'),
        arrivalTime: new Date('2026-03-03T11:00:00'),
        seatCount: 170,
        availableSeats: 170,
        basePrice: 5200,
        aircraftType: 'Boeing 787'
      }
    ];

    await Flight.insertMany(flights);
    console.log('Sample flights created');

    console.log('\n=== Seeding Complete ===');
    console.log('Admin Login: admin@flight.com / admin123');
    console.log('User Login: john@email.com / user123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
