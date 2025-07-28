// Configuration for demo mode
export const config = {
  isDemoMode: process.env.NODE_ENV === 'development',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  
  // Demo mode settings
  demo: {
    skipAuthCheck: true,
    skipApiCalls: true,
    useMockData: true,
    preventRedirects: true
  }
};

export const isDemoMode = () => config.isDemoMode;
export const shouldSkipAuthCheck = () => config.isDemoMode && config.demo.skipAuthCheck;
export const shouldSkipApiCalls = () => config.isDemoMode && config.demo.skipApiCalls;
export const shouldUseMockData = () => config.isDemoMode && config.demo.useMockData;
export const shouldPreventRedirects = () => config.isDemoMode && config.demo.preventRedirects;
