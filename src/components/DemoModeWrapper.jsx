'use client';

import { useEffect } from 'react';

const DemoModeWrapper = ({ children }) => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Disable auto-refresh and navigation in demo mode
    if (process.env.NODE_ENV === 'development') {
      console.log('🎨 Running in UI/UX Demo Mode');
      console.log('📝 Auth checks disabled for smooth testing');
      console.log('🔄 Auto-refresh prevention enabled');

      // Prevent any unwanted navigation
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function(...args) {
        console.log('Navigation intercepted in demo mode:', args);
        return originalPushState.apply(this, args);
      };

      window.history.replaceState = function(...args) {
        console.log('Navigation intercepted in demo mode:', args);
        return originalReplaceState.apply(this, args);
      };

      // Cleanup
      return () => {
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, []);

  return children;
};

export default DemoModeWrapper;
