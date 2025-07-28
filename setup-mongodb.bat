@echo off
echo ========================================
echo    MongoDB Setup for World Across
echo ========================================
echo.

echo Choose your MongoDB setup option:
echo.
echo 1. MongoDB Atlas (Cloud - Recommended)
echo 2. Local MongoDB Installation
echo 3. Docker MongoDB
echo 4. Skip MongoDB setup
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto atlas
if "%choice%"=="2" goto local
if "%choice%"=="3" goto docker
if "%choice%"=="4" goto skip
goto invalid

:atlas
echo.
echo ========================================
echo    MongoDB Atlas Setup
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Go to https://www.mongodb.com/atlas
echo 2. Create a free account
echo 3. Create a new cluster (M0 Free tier)
echo 4. Create a database user
echo 5. Configure network access (allow all IPs for development)
echo 6. Get your connection string
echo.
echo Your connection string should look like:
echo mongodb+srv://username:password@cluster.mongodb.net/worldacross
echo.
set /p atlas_uri="Enter your MongoDB Atlas connection string: "

if "%atlas_uri%"=="" (
    echo Error: Connection string cannot be empty!
    pause
    exit /b 1
)

echo.
echo Updating environment configuration...
cd apps\api

powershell -Command "(Get-Content .env) -replace 'MONGODB_URI=.*', 'MONGODB_URI=%atlas_uri%' | Set-Content .env"

echo ✅ MongoDB Atlas configured successfully!
echo.
goto seed

:local
echo.
echo ========================================
echo    Local MongoDB Setup
echo ========================================
echo.
echo Checking if MongoDB is installed...

where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ MongoDB is not installed or not in PATH
    echo.
    echo Please install MongoDB:
    echo 1. Download from: https://www.mongodb.com/try/download/community
    echo 2. Choose Windows MSI installer
    echo 3. Install with "Complete" setup
    echo 4. Make sure to install as Windows Service
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo ✅ MongoDB found!
echo.
echo Starting MongoDB service...
net start MongoDB >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB service might already be running or needs manual start
)

echo Testing MongoDB connection...
mongosh --eval "db.adminCommand('ismaster')" >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Cannot connect to MongoDB
    echo Please ensure MongoDB is running on port 27017
    pause
    exit /b 1
)

echo ✅ MongoDB is running and accessible!
echo.
echo Using local MongoDB configuration...
cd apps\api
powershell -Command "(Get-Content .env) -replace 'MONGODB_URI=.*', 'MONGODB_URI=mongodb://localhost:27017/worldacross' | Set-Content .env"

echo ✅ Local MongoDB configured successfully!
echo.
goto seed

:docker
echo.
echo ========================================
echo    Docker MongoDB Setup
echo ========================================
echo.
echo Checking if Docker is installed...

where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not in PATH
    echo.
    echo Please install Docker Desktop:
    echo 1. Download from: https://www.docker.com/products/docker-desktop
    echo 2. Install and start Docker Desktop
    echo 3. Ensure Docker is running
    echo.
    echo After installation, run this script again.
    pause
    exit /b 1
)

echo ✅ Docker found!
echo.
echo Creating Docker Compose configuration...

echo version: '3.8' > docker-compose.yml
echo services: >> docker-compose.yml
echo   mongodb: >> docker-compose.yml
echo     image: mongo:7.0 >> docker-compose.yml
echo     container_name: world-across-mongodb >> docker-compose.yml
echo     restart: always >> docker-compose.yml
echo     ports: >> docker-compose.yml
echo       - "27017:27017" >> docker-compose.yml
echo     environment: >> docker-compose.yml
echo       MONGO_INITDB_DATABASE: worldacross >> docker-compose.yml
echo     volumes: >> docker-compose.yml
echo       - mongodb_data:/data/db >> docker-compose.yml
echo. >> docker-compose.yml
echo volumes: >> docker-compose.yml
echo   mongodb_data: >> docker-compose.yml

echo Starting MongoDB container...
docker-compose up -d

if %errorlevel% neq 0 (
    echo ❌ Failed to start MongoDB container
    pause
    exit /b 1
)

echo ✅ MongoDB container started successfully!
echo.
echo Waiting for MongoDB to be ready...
timeout /t 10 /nobreak > nul

echo Updating environment configuration...
cd apps\api
powershell -Command "(Get-Content .env) -replace 'MONGODB_URI=.*', 'MONGODB_URI=mongodb://localhost:27017/worldacross' | Set-Content .env"

echo ✅ Docker MongoDB configured successfully!
echo.
goto seed

:skip
echo.
echo Skipping MongoDB setup...
echo You can configure MongoDB later by updating the MONGODB_URI in apps\api\.env
echo.
goto end

:seed
echo ========================================
echo    Database Seeding
echo ========================================
echo.
echo Seeding database with sample data...
cd apps\api
node seedData.js

if %errorlevel% neq 0 (
    echo ❌ Database seeding failed!
    echo This might be due to connection issues.
    echo You can try running 'node seedData.js' manually later.
    echo.
) else (
    echo ✅ Database seeded successfully!
    echo.
    echo Demo credentials created:
    echo 📧 Admin: admin@worldacross.com / Admin@123
    echo 👤 User: john@example.com / User@123
    echo.
)

goto end

:invalid
echo Invalid choice! Please enter 1, 2, 3, or 4.
pause
exit /b 1

:end
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo MongoDB setup is complete!
echo.
echo Next steps:
echo 1. Run 'start-local.bat' to start both servers
echo 2. Open http://localhost:3000 in your browser
echo 3. Test login with demo credentials
echo.
echo Press any key to continue...
pause > nul
