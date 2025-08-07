@echo off
echo ========================================
echo    World Across - Local Setup
echo ========================================
echo.

echo Setting up World Across Travel Portal for local development...
echo.

echo 1. Installing Backend Dependencies...
cd apps\api
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependency installation failed!
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully!
echo.

echo 2. Installing Frontend Dependencies...
cd ..\web
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed!
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully!
echo.

echo 3. Setting up Database with Sample Data...
cd ..\api
node seedData.js
if %errorlevel% neq 0 (
    echo ❌ Database seeding failed! Make sure MongoDB is running.
    echo 💡 Install MongoDB locally or use MongoDB Atlas
    pause
    exit /b 1
)
echo ✅ Database seeded successfully!
echo.

cd ..\..

echo ========================================
echo   ✅ Setup Complete!
echo ========================================
echo.
echo 🎉 World Across is ready for local development!
echo.
echo Next steps:
echo 1. Make sure MongoDB is running (if using local MongoDB)
echo 2. Run 'start-local.bat' to start both servers
echo.
echo 📱 Frontend will be available at: http://localhost:3000
echo 🔧 Backend API will be available at: http://localhost:5000
echo.
echo 📧 Admin Login Credentials:
echo    Email: admin@worldacross.com
echo    Password: Admin@123
echo.
echo 👤 Test User Login Credentials:
echo    Email: john@example.com
echo    Password: User@123
echo.
echo Press any key to continue...
pause > nul
