'use client';

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI, handleApiError } from '@/lib/staticApi';
import { shouldSkipAuthCheck } from '@/lib/config';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Start with false to prevent loading state issues
  error: null,
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const checkAuth = useCallback(async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      const response = await authAPI.getMe();
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data.user });
    } catch (error) {
      // Silently handle auth check failure in demo mode
      console.log('Auth check failed - running in demo mode');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  // Check if user is authenticated on app load (only once)
  useEffect(() => {
    // Skip auth check in demo mode to prevent page refreshing
    if (shouldSkipAuthCheck()) {
      console.log('Skipping auth check in demo mode');
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    } else {
      checkAuth();
    }
  }, []); // Empty dependency array to prevent loops

  const login = useCallback(async (credentials) => {
    // In demo mode, simulate successful login without API call
    if (shouldSkipAuthCheck()) {
      console.log('Demo login - no API call made');
      return { success: true, user: { firstName: 'Demo', email: credentials.email } };
    }

    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await authAPI.login(credentials);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data.user });

      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const register = useCallback(async (userData) => {
    // In demo mode, simulate successful registration without API call
    if (shouldSkipAuthCheck()) {
      console.log('Demo registration - no API call made');
      return { success: true, user: { firstName: userData.firstName, email: userData.email } };
    }

    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await authAPI.register(userData);
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response.data.user });

      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  }, []);

  const updateProfile = async (profileData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      const response = await authAPI.updateProfile(profileData);
      dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: response.data.user });
      
      return { success: true, user: response.data.user };
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
      
      await authAPI.changePassword(passwordData);
      
      return { success: true };
    } catch (error) {
      const errorMessage = handleApiError(error);
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const clearError = useCallback(() => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  }, []);

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
