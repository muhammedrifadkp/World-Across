@echo off
echo ========================================
echo    World Across - Vercel Deployment
echo ========================================
echo.

echo [1/5] Checking Vercel CLI installation...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo Failed to install Vercel CLI
        pause
        exit /b 1
    )
) else (
    echo ✓ Vercel CLI is installed
)

echo.
echo [2/5] Checking if logged in to Vercel...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo Please login to Vercel...
    vercel login
    if %errorlevel% neq 0 (
        echo Failed to login to Vercel
        pause
        exit /b 1
    )
) else (
    echo ✓ Logged in to Vercel
)

echo.
echo [3/5] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [4/5] Building the application...
npm run build
if %errorlevel% neq 0 (
    echo Build failed
    pause
    exit /b 1
)
echo ✓ Build successful

echo.
echo [5/5] Deploying to Vercel...
vercel --prod
if %errorlevel% neq 0 (
    echo Deployment failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo    ✓ Deployment Successful!
echo ========================================
echo.
echo Your World Across app is now live!
echo Check your Vercel dashboard for the URL.
echo.
pause
