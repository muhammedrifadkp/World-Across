@echo off
echo ========================================
echo    World Across - Feature Testing
echo ========================================
echo.

echo Testing World Across features...
echo.

echo 1. Testing Backend API Health...
curl -s http://localhost:5000/health > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Backend API is not running on port 5000
    echo Please start the backend server first: cd apps\api && node server.js
    echo.
    goto frontend_test
) else (
    echo ✅ Backend API is running
)

echo.
echo 2. Testing API Endpoints...

echo    - Testing auth endpoints...
curl -s -X GET http://localhost:5000/api/auth/me > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Auth endpoints not responding
) else (
    echo ✅ Auth endpoints working
)

echo    - Testing membership endpoints...
curl -s -X GET http://localhost:5000/api/memberships > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Membership endpoints not responding
) else (
    echo ✅ Membership endpoints working
)

echo    - Testing package endpoints...
curl -s -X GET http://localhost:5000/api/packages > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Package endpoints not responding
) else (
    echo ✅ Package endpoints working
)

echo    - Testing destination endpoints...
curl -s -X GET http://localhost:5000/api/destinations > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Destination endpoints not responding
) else (
    echo ✅ Destination endpoints working
)

:frontend_test
echo.
echo 3. Testing Frontend Application...
curl -s http://localhost:3000 > nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Frontend is not running on port 3000
    echo Please start the frontend server: cd apps\web && npm run dev
    echo.
) else (
    echo ✅ Frontend is running
)

echo.
echo 4. Testing Database Connection...
cd apps\api
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/worldacross')
  .then(() => {
    console.log('✅ Database connection successful');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ Database connection failed:', err.message);
    process.exit(1);
  });
" 2>nul

echo.
echo ========================================
echo    Manual Testing Checklist
echo ========================================
echo.
echo Please test the following features manually:
echo.
echo 🌐 Frontend (http://localhost:3000):
echo   □ Homepage loads with hero section
echo   □ Navigation menu works
echo   □ Package cards display
echo   □ Membership plans show
echo   □ Footer displays correctly
echo.
echo 🔐 Authentication:
echo   □ Register new user works
echo   □ Login with demo credentials works
echo   □ User dropdown appears when logged in
echo   □ Logout functionality works
echo.
echo 📦 Demo Credentials:
echo   Admin: admin@worldacross.com / Admin@123
echo   User:  john@example.com / User@123
echo.
echo 🎯 Core Features to Test:
echo   □ Browse packages
echo   □ View package details
echo   □ Check membership plans
echo   □ User profile access
echo   □ Responsive design on mobile
echo.
echo 🔧 API Testing (http://localhost:5000):
echo   □ /health - API health check
echo   □ /api/packages - Package listing
echo   □ /api/memberships - Membership plans
echo   □ /api/destinations - Destination data
echo.
echo ========================================
echo    Troubleshooting
echo ========================================
echo.
echo If you encounter issues:
echo.
echo 🔴 Backend not starting:
echo   - Check MongoDB is running
echo   - Verify .env configuration
echo   - Check port 5000 is available
echo.
echo 🔴 Frontend not starting:
echo   - Run: npm install --legacy-peer-deps
echo   - Check port 3000 is available
echo   - Verify Node.js version (18+)
echo.
echo 🔴 Database connection failed:
echo   - Check MongoDB service is running
echo   - Verify MONGODB_URI in .env
echo   - For Atlas: check network access
echo.
echo 🔴 Features not working:
echo   - Clear browser cache
echo   - Check browser console for errors
echo   - Verify API endpoints are responding
echo.
echo Press any key to open the application...
pause > nul

echo.
echo Opening World Across in your browser...
start http://localhost:3000

echo.
echo Opening API health check...
start http://localhost:5000/health

echo.
echo ========================================
echo    Happy Testing! 🚀
echo ========================================
