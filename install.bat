@echo off
echo Installing backend dependencies...
cd server
call npm install

echo.
echo Installing frontend dependencies...
cd ..\client
call npm install

echo.
echo Installation complete!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Run setup-database.bat to seed the database
echo 3. Run start-backend.bat to start the server
echo 4. Run start-frontend.bat to start the React app
pause
