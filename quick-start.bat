@echo off
echo ========================================
echo    World Across - Quick UI/UX Demo
echo ========================================
echo.

echo Starting World Across for UI/UX testing...
echo (Running without database - using mock data)
echo.

echo 1. Starting Backend API Server...
start "World Across API" cmd /k "cd apps\api && echo Starting backend server... && node server.js"

echo 2. Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo 3. Starting Frontend Development Server...
start "World Across Frontend" cmd /k "cd apps\web && echo Starting frontend server... && npm run dev"

echo 4. Waiting for frontend to start...
timeout /t 10 /nobreak > nul

echo.
echo ========================================
echo   🚀 World Across is starting up!
echo ========================================
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:5000
echo 📊 API Health: http://localhost:5000/health
echo.
echo 🎨 UI/UX Features to Test:
echo   ✅ Homepage with hero slider
echo   ✅ Package cards and categories
echo   ✅ Membership pricing tables
echo   ✅ Navigation and dropdowns
echo   ✅ Responsive design
echo   ✅ Animations and transitions
echo   ✅ Login/Register forms
echo   ✅ Footer and contact info
echo.
echo 📝 Note: Running in demo mode with mock data
echo    Database connection not required for UI/UX testing
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak > nul

echo Opening World Across...
start http://localhost:3000

echo.
echo ========================================
echo   Happy UI/UX Testing! 🎨
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
