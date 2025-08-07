'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken, getStoredToken } from '@/lib/jwt';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Get token from localStorage
        const token = getStoredToken();
        
        if (!token) {
          console.log('No token found, redirecting to login');
          router.push(redirectTo);
          return;
        }

        // Verify token
        const verification = verifyToken(token);
        
        if (!verification.valid) {
          console.log('Invalid token, redirecting to login:', verification.error);
          router.push(redirectTo);
          return;
        }

        // Token is valid, check if user is loaded in context
        if (!isLoading && !isAuthenticated) {
          console.log('Token valid but user not authenticated in context, redirecting');
          router.push(redirectTo);
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error('Authentication check failed:', error);
        router.push(redirectTo);
      }
    };

    // Only check if not already loading
    if (!isLoading) {
      checkAuthentication();
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Access</h2>
          <p className="text-gray-600">Please wait while we check your authentication...</p>
        </div>
      </div>
    );
  }

  // Show error if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to access this page.</p>
          <button
            onClick={() => router.push(redirectTo)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated, render children
  return children;
};

export default ProtectedRoute;
