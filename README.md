# FlightFinder: Navigating Your Air Travel Options

A full-stack flight booking application built with the MERN stack.

## Team Details

**_Team ID_ : LTVIP2026TMIDS24618**

**_Team Size_ : 4**

**_Team Leader_ : Mohammad Abdul Gafoor**

**_Team member_ : Pamarthi Lakshmi Durga**

**_Team member_ : Shaik Shahina**

**_Team member_ : Sanaka Venkata Jahnavi**

## Features

- User authentication (register/login)
- Flight search and filtering
- Book flights with passenger details
- View and cancel bookings
- Admin dashboard to manage flights, bookings, and users

## Tech Stack

**Frontend:** React.js, React Router, Bootstrap, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** bcrypt for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flightbooking
```

4. Seed the database with sample data:
```bash
node seed.js
```

5. Start the server:
```bash
npm start
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Default Login Credentials

**Admin:**
- Email: admin@flight.com
- Password: admin123

**User:**
- Email: john@email.com
- Password: user123

## API Endpoints

### Users
- POST /api/users/register - Register new user
- POST /api/users/login - User login
- GET /api/users - Get all users (admin)

### Flights
- GET /api/flights - Get all flights
- GET /api/flights/search - Search flights
- GET /api/flights/:id - Get single flight
- POST /api/flights - Add new flight (admin)
- PUT /api/flights/:id - Update flight (admin)
- DELETE /api/flights/:id - Delete flight (admin)

### Bookings
- POST /api/bookings - Create booking
- GET /api/bookings/user/:userId - Get user bookings
- GET /api/bookings - Get all bookings (admin)
- PATCH /api/bookings/:id/cancel - Cancel booking

## Project Structure

```
FlightBookingApp/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # Auth context
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── App.js
└── server/                 # Express backend
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── middleware/         # Custom middleware
    ├── seed.js             # Database seeder
    └── index.js            # Entry point
```

## Usage

1. Register a new user or login with existing credentials
2. Search for flights by origin, destination, and date
3. Book a flight by selecting seats and entering passenger details
4. View your bookings and cancel if needed
5. Admin can add new flights and view all bookings and users
