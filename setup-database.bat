@echo off
echo Seeding database with sample data...
cd server
call node seed.js
echo.
echo Database seeded successfully!
echo Admin login: admin@flight.com / admin123
echo User login: john@email.com / user123
pause
