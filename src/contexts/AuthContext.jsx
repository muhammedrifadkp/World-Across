'use client';

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { authAPI, handleApiError } from '@/lib/staticApi';
import { shouldSkipAuthCheck } from '@/lib/config';
import {
  generateToken,
  verifyToken,
  getStoredToken,
  storeToken,
  removeToken,
  getCurrentUser
} from '@/lib/jwt';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Start with false to prevent loading state issues
  error: null,
  token: null
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_USER: 'UPDATE_USER',
  SET_TOKEN: 'SET_TOKEN',
  CHECK_AUTH: 'CHECK_AUTH'
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
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
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
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case AUTH_ACTIONS.CHECK_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false,
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

      // Check for stored JWT token
      const token = getStoredToken();
      if (token) {
        const verification = verifyToken(token);
        if (verification.valid) {
          // Token is valid, get user data from API
          const response = await authAPI.getMe();
          if (response.data.user.status !== 'active') {
            // User is not active, remove token and logout
            removeToken();
            dispatch({ type: AUTH_ACTIONS.LOGOUT });
            return;
          }
          dispatch({
            type: AUTH_ACTIONS.CHECK_AUTH,
            payload: {
              user: response.data.user,
              token: token,
              isAuthenticated: true
            }
          });
          return;
        } else {
          // Token is invalid, remove it
          removeToken();
        }
      }

      // No valid token found
      dispatch({
        type: AUTH_ACTIONS.CHECK_AUTH,
        payload: {
          user: null,
          token: null,
          isAuthenticated: false
        }
      });
    } catch (error) {
      console.log('Auth check failed:', error);
      removeToken();
      dispatch({
        type: AUTH_ACTIONS.CHECK_AUTH,
        payload: {
          user: null,
          token: null,
          isAuthenticated: false
        }
      });
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

  // Token expiration checker
  useEffect(() => {
    if (!state.isAuthenticated || !state.token) return;

    const checkTokenExpiration = () => {
      const verification = verifyToken(state.token);
      if (!verification.valid) {
        console.log('Token expired, logging out user');
        // Remove token and dispatch logout action directly
        removeToken();
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    };

    // Check token expiration every 5 minutes
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [state.isAuthenticated, state.token]);

  const login = useCallback(async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
      dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

      const response = await authAPI.login(credentials);
      const user = response.data.user;

      // Generate JWT token
      const token = generateToken({ user }, '24h');

      // Store token
      storeToken(token);

      // Update state
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token }
      });

      return { success: true, user, token };
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
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
      // Remove JWT token
      removeToken();

      // Try to call logout API (optional in demo mode)
      try {
        await authAPI.logout();
      } catch (error) {
        console.log('Logout API call failed (demo mode):', error);
      }
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