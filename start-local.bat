@echo off
echo ========================================
echo    World Across - Local Development
echo ========================================
echo.

echo Starting World Across Travel Portal locally...
echo.

echo 1. Starting Backend API Server...
start "World Across API" cmd /k "cd apps\api && node server.js"

echo 2. Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo 3. Starting Frontend Development Server...
start "World Across Frontend" cmd /k "cd apps\web && npm run dev"

echo.
echo ========================================
echo   🚀 World Across is starting up!
echo ========================================
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 📊 API Health: http://localhost:5000/health
echo.
echo 📧 Admin Login:
echo    Email: admin@worldacross.com
echo    Password: Admin@123
echo.
echo 👤 Test User Login:
echo    Email: john@example.com
echo    Password: User@123
echo.
echo Press any key to close this window...
pause > nul
