// Static data imports
import { destinations, packages, memberships, testimonials, teamMembers, companyStats, contactInfo } from '@/data/staticData';

// Simulate API delay for realistic experience
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API response format
const createResponse = (data, success = true, message = 'Success') => ({
  data: {
    success,
    message,
    ...data
  }
});

// Mock API instance for demo purposes
const api = {
  get: async (url, config = {}) => {
    await simulateDelay();
    // Return mock data based on URL
    return createResponse({});
  },
  post: async (url, data, config = {}) => {
    await simulateDelay();
    return createResponse({});
  },
  put: async (url, data, config = {}) => {
    await simulateDelay();
    return createResponse({});
  },
  delete: async (url, config = {}) => {
    await simulateDelay();
    return createResponse({});
  }
};

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Membership API calls
export const membershipAPI = {
  getAll: () => api.get('/memberships'),
  getMy: () => api.get('/memberships/my'),
  getById: (id) => api.get(`/memberships/${id}`),
  buy: (membershipData) => api.post('/memberships/buy', membershipData),
  getMyMembership: (id) => api.get(`/memberships/my/${id}`),
};

// Package API calls
export const packageAPI = {
  getAll: (params = {}) => api.get('/packages', { params }),
  getById: (id) => api.get(`/packages/${id}`),
  getByCategory: (category, params = {}) => api.get(`/packages/category/${category}`, { params }),
  getFeatured: (params = {}) => api.get('/packages/featured', { params }),
  addReview: (packageId, reviewData) => api.post(`/packages/${packageId}/reviews`, reviewData),
};

// Booking API calls
export const bookingAPI = {
  getMy: (params = {}) => api.get('/bookings/my', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  cancel: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),
};

// Payment API calls
export const paymentAPI = {
  createBookingOrder: (bookingId) => api.post(`/payments/create-order/booking/${bookingId}`),
  createMembershipOrder: (membershipId) => api.post(`/payments/create-order/membership/${membershipId}`),
  verifyPayment: (paymentData) => api.post('/payments/verify', paymentData),
  getHistory: (params = {}) => api.get('/payments/history', { params }),
};

// Destination API calls
export const destinationAPI = {
  getAll: (params = {}) => api.get('/destinations', { params }),
  getDomestic: (params = {}) => api.get('/destinations/domestic', { params }),
  getInternational: (params = {}) => api.get('/destinations/international', { params }),
  getByName: (name) => api.get(`/destinations/${name}`),
  getPopular: (params = {}) => api.get('/destinations/popular', { params }),
  search: (params = {}) => api.get('/destinations/search', { params }),
};

// User API calls (Admin only)
export const userAPI = {
  getAll: (params = {}) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getStats: () => api.get('/users/stats/overview'),
};

// Utility functions
export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  } else if (error.message) {
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
};

export const isApiError = (error) => {
  return error.response && error.response.data;
};

export default api;
