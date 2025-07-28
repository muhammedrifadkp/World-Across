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

// Auth API (Static)
export const authAPI = {
  login: async (credentials) => {
    await simulateDelay();
    console.log('Static login simulation');
    return createResponse({ 
      user: { 
        id: 1, 
        firstName: 'Demo', 
        lastName: 'User',
        email: credentials.email 
      } 
    });
  },
  register: async (userData) => {
    await simulateDelay();
    console.log('Static register simulation');
    return createResponse({ 
      user: { 
        id: 1, 
        firstName: userData.firstName,
        lastName: userData.lastName, 
        email: userData.email 
      } 
    });
  },
  logout: async () => {
    await simulateDelay();
    return createResponse({});
  },
  getMe: async () => {
    await simulateDelay();
    return createResponse({ user: null });
  },
  updateProfile: async (profileData) => {
    await simulateDelay();
    return createResponse({ user: profileData });
  },
  changePassword: async (passwordData) => {
    await simulateDelay();
    return createResponse({});
  },
};

// Package API (Static)
export const packageAPI = {
  getAll: async (params = {}) => {
    await simulateDelay();
    let filteredPackages = [...packages];
    
    if (params.category) {
      filteredPackages = filteredPackages.filter(pkg => 
        pkg.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    
    if (params.featured) {
      filteredPackages = filteredPackages.filter(pkg => pkg.isFeatured);
    }
    
    if (params.limit) {
      filteredPackages = filteredPackages.slice(0, parseInt(params.limit));
    }
    
    return createResponse({ 
      packages: filteredPackages,
      total: filteredPackages.length 
    });
  },
  getById: async (id) => {
    await simulateDelay();
    const packageData = packages.find(pkg => pkg.id === parseInt(id));
    return createResponse({ package: packageData });
  },
  getFeatured: async () => {
    await simulateDelay();
    const featuredPackages = packages.filter(pkg => pkg.isFeatured);
    return createResponse({ packages: featuredPackages });
  },
  getByCategory: async (category) => {
    await simulateDelay();
    const categoryPackages = packages.filter(pkg => 
      pkg.category.toLowerCase() === category.toLowerCase()
    );
    return createResponse({ packages: categoryPackages });
  },
  search: async (query) => {
    await simulateDelay();
    const searchResults = packages.filter(pkg => 
      pkg.title.toLowerCase().includes(query.q.toLowerCase()) ||
      pkg.description.toLowerCase().includes(query.q.toLowerCase())
    );
    return createResponse({ packages: searchResults });
  },
};

// Membership API (Static)
export const membershipAPI = {
  getAll: async () => {
    await simulateDelay();
    return createResponse({ memberships });
  },
  getById: async (id) => {
    await simulateDelay();
    const membership = memberships.find(m => m.id === parseInt(id));
    return createResponse({ membership });
  },
  purchase: async (membershipId, paymentData) => {
    await simulateDelay();
    return createResponse({ 
      orderId: 'order_' + Date.now(),
      status: 'success' 
    });
  },
};

// Destination API (Static)
export const destinationAPI = {
  getAll: async () => {
    await simulateDelay();
    return createResponse({ destinations });
  },
  getById: async (id) => {
    await simulateDelay();
    const destination = destinations.find(d => d.id === parseInt(id));
    return createResponse({ destination });
  },
  getPopular: async () => {
    await simulateDelay();
    const popularDestinations = destinations.filter(d => d.avgRating >= 4.7);
    return createResponse({ destinations: popularDestinations });
  },
};

// Contact API (Static)
export const contactAPI = {
  sendMessage: async (messageData) => {
    await simulateDelay();
    console.log('Contact form submitted:', messageData);
    return createResponse({ 
      message: 'Thank you for your message. We will get back to you soon!' 
    });
  },
};

// Static data getters
export const staticData = {
  getTestimonials: () => testimonials,
  getTeamMembers: () => teamMembers,
  getCompanyStats: () => companyStats,
  getContactInfo: () => contactInfo,
};

// Error handler utility (for compatibility)
export const handleApiError = (error) => {
  return error.message || 'An error occurred';
};
