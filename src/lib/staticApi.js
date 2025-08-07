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

    // Check if it's our specific user
    if (credentials.email === 'john@example.com') {
      return createResponse({
        user: {
          id: 1,
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          phone: '+91 9876543210',
          dateOfBirth: '1985-03-20',
          profileImage: null,

          // Membership Details
          membership: {
            type: 'Premium',
            level: 'Platinum',
            memberSince: '2022-06-15',
            validUntil: '2025-06-14',
            membershipId: 'WA-PLAT-2022-001',
            benefits: [
              'Free cancellation up to 48 hours',
              '25% discount on all packages',
              'Priority customer support 24/7',
              'Complimentary airport transfers',
              'Access to exclusive VIP deals',
              'Free travel insurance',
              'Dedicated travel consultant',
              'Lounge access at airports'
            ],
            loyaltyPoints: 3850,
            tierProgress: {
              current: 'Platinum',
              next: 'Diamond',
              pointsNeeded: 1150
            }
          },

          // Travel Documents
          documents: {
            passport: {
              number: 'J8765432',
              issueDate: '2019-08-10',
              expiryDate: '2029-08-09',
              issuingCountry: 'India',
              status: 'valid'
            },
            visa: [
              {
                country: 'USA',
                type: 'Tourist B1/B2',
                number: 'US987654321',
                validFrom: '2023-09-01',
                validUntil: '2024-08-31',
                status: 'valid'
              },
              {
                country: 'Schengen',
                type: 'Tourist',
                number: 'SCH123456789',
                validFrom: '2024-01-01',
                validUntil: '2024-12-31',
                status: 'valid'
              },
              {
                country: 'UK',
                type: 'Tourist',
                number: 'UK456789123',
                validFrom: '2023-10-01',
                validUntil: '2024-09-30',
                status: 'valid'
              }
            ],
            panCard: 'BQXPS1234K',
            aadharCard: '2345-6789-0123'
          },

          // Travel Preferences
          preferences: {
            preferredDestinations: ['Beach Resorts', 'Hill Stations', 'Historical Sites', 'Adventure Sports'],
            travelStyle: 'Luxury Premium',
            budgetRange: '75000-150000',
            accommodationType: '5-Star Hotels & Resorts',
            mealPreference: 'Non-Vegetarian',
            travelCompanions: 'Family with Kids',
            specialRequirements: ['Child-friendly amenities', 'Pool access', 'Spa services'],
            languages: ['English', 'Hindi', 'French'],
            currency: 'INR'
          },

          // Account Details
          account: {
            balance: 28500,
            totalSpent: 285000,
            totalSavings: 45000,
            creditLimit: 100000,
            lastLogin: new Date().toISOString(),
            accountStatus: 'Active Premium',
            verificationStatus: {
              email: true,
              phone: true,
              identity: true,
              address: true
            }
          },

          // Address Information
          address: {
            street: '456 Bandra West, Linking Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pincode: '400050',
            landmark: 'Near Bandra Station'
          },

          // Emergency Contact
          emergencyContact: {
            name: 'Sarah Smith',
            relationship: 'Spouse',
            phone: '+91 9876543211',
            email: 'sarah.smith@example.com'
          },

          // Recent Activity Summary
          recentActivity: {
            lastBooking: {
              destination: 'Maldives Water Villa Resort',
              date: '2024-01-20',
              amount: 85000,
              status: 'Confirmed'
            },
            upcomingTrip: {
              destination: 'Switzerland Alps Tour',
              date: '2024-03-15',
              daysLeft: 42
            },
            totalTrips: 18,
            countriesVisited: 12
          }
        }
      });
    } else {
      // Fallback for other users
      return createResponse({
        user: {
          id: 2,
          firstName: 'Guest',
          lastName: 'User',
          email: credentials.email,
          phone: '+91 9999999999',
          dateOfBirth: '1990-01-01',
          profileImage: null,
          membership: {
            type: 'Basic',
            level: 'Silver',
            memberSince: '2024-01-01',
            validUntil: '2024-12-31',
            membershipId: 'WA-SILVER-2024-001',
            benefits: ['10% discount on packages', 'Basic customer support'],
            loyaltyPoints: 500,
            tierProgress: { current: 'Silver', next: 'Gold', pointsNeeded: 1500 }
          },
          documents: {
            passport: { number: 'G1234567', issueDate: '2020-01-01', expiryDate: '2030-01-01', issuingCountry: 'India', status: 'valid' },
            visa: [],
            panCard: 'GUEST1234P',
            aadharCard: '9999-9999-9999'
          },
          preferences: {
            preferredDestinations: ['Beach'],
            travelStyle: 'Budget',
            budgetRange: '10000-25000',
            accommodationType: 'Hotels',
            mealPreference: 'Vegetarian',
            travelCompanions: 'Solo',
            specialRequirements: [],
            languages: ['English'],
            currency: 'INR'
          },
          account: {
            balance: 5000,
            totalSpent: 15000,
            totalSavings: 2000,
            creditLimit: 25000,
            lastLogin: new Date().toISOString(),
            accountStatus: 'Active',
            verificationStatus: { email: true, phone: false, identity: false, address: false }
          },
          address: {
            street: '123 Main Street',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India',
            pincode: '110001',
            landmark: 'Near Metro Station'
          },
          emergencyContact: {
            name: 'Emergency Contact',
            relationship: 'Friend',
            phone: '+91 9999999998',
            email: 'emergency@example.com'
          },
          recentActivity: {
            lastBooking: { destination: 'Local Tour', date: '2024-01-01', amount: 5000, status: 'Confirmed' },
            upcomingTrip: { destination: 'Weekend Getaway', date: '2024-02-15', daysLeft: 15 },
            totalTrips: 3,
            countriesVisited: 1
          }
        }
      });
    }
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
    // Return the full user object for the demo
    return authAPI.login({ email: 'john@example.com' });
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

// Dashboard API (Static)
export const dashboardAPI = {
  getOverview: async () => {
    await simulateDelay();
    return createResponse({
      stats: {
        totalPurchases: 18,
        totalSpent: 285000,
        availedServices: 15,
        currentBalance: 28500,
        membershipStatus: 'Premium Platinum',
        loyaltyPoints: 3850
      },
      recentActivities: [
        {
          id: 1,
          type: 'purchase',
          title: 'Maldives Water Villa Resort Booked',
          date: '2024-01-20',
          amount: 85000
        },
        {
          id: 2,
          type: 'service',
          title: 'VIP Airport Lounge Access Used',
          date: '2024-01-18',
          amount: null
        },
        {
          id: 3,
          type: 'payment',
          title: 'Premium Wallet Recharged',
          date: '2024-01-15',
          amount: 50000
        },
        {
          id: 4,
          type: 'purchase',
          title: 'Switzerland Alps Tour Package',
          date: '2024-01-10',
          amount: 125000
        },
        {
          id: 5,
          type: 'service',
          title: 'Spa & Wellness Package Used',
          date: '2024-01-08',
          amount: null
        }
      ],
      upcomingTrips: [
        {
          id: 1,
          destination: 'Switzerland Alps Tour',
          date: 'Mar 15-25, 2024',
          duration: '10 Days',
          status: 'confirmed'
        },
        {
          id: 2,
          destination: 'Dubai Luxury Experience',
          date: 'Apr 20-27, 2024',
          duration: '7 Days',
          status: 'confirmed'
        },
        {
          id: 3,
          destination: 'Bali Premium Resort',
          date: 'May 10-17, 2024',
          duration: '8 Days',
          status: 'pending'
        }
      ]
    });
  },

  getPurchaseHistory: async () => {
    await simulateDelay();
    return createResponse({
      purchases: [
        {
          id: 1,
          orderId: 'WA2024001',
          title: 'Goa Beach Paradise Package',
          type: 'package',
          destination: 'Goa',
          amount: 25000,
          date: '2024-01-15',
          status: 'confirmed',
          guests: 2,
          details: '5 days 4 nights package including accommodation, meals, and sightseeing'
        },
        {
          id: 2,
          orderId: 'WA2024002',
          title: 'Kerala Backwater Experience',
          type: 'package',
          destination: 'Kerala',
          amount: 35000,
          date: '2024-01-05',
          status: 'confirmed',
          guests: 4,
          details: '6 days 5 nights houseboat experience with traditional Kerala cuisine'
        },
        {
          id: 3,
          orderId: 'WA2024003',
          title: 'Premium Membership',
          type: 'membership',
          destination: null,
          amount: 15000,
          date: '2023-12-20',
          status: 'completed',
          guests: null,
          details: 'Annual premium membership with exclusive benefits and discounts'
        },
        {
          id: 4,
          orderId: 'WA2024004',
          title: 'Rajasthan Heritage Tour',
          type: 'package',
          destination: 'Rajasthan',
          amount: 45000,
          date: '2023-12-10',
          status: 'completed',
          guests: 2,
          details: '8 days 7 nights royal experience covering Jaipur, Udaipur, and Jodhpur'
        },
        {
          id: 5,
          orderId: 'WA2024005',
          title: 'Flight Booking - Mumbai to Delhi',
          type: 'flight',
          destination: 'Delhi',
          amount: 8500,
          date: '2023-11-25',
          status: 'completed',
          guests: 1,
          details: 'Round trip flight booking with premium economy seats'
        }
      ]
    });
  },

  getAvailedServices: async () => {
    await simulateDelay();
    return createResponse({
      services: [
        {
          id: 1,
          title: 'Luxury Beach Resort Stay',
          category: 'accommodation',
          destination: 'Goa',
          usedDate: '2024-01-15',
          duration: '4 nights',
          guests: 2,
          rating: 5,
          status: 'completed',
          description: 'Stayed at premium beachfront resort with ocean view rooms',
          image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          review: 'Amazing experience with excellent service and beautiful location',
          photos: [
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          ]
        },
        {
          id: 2,
          title: 'Airport Transfer Service',
          category: 'transportation',
          destination: 'Goa',
          usedDate: '2024-01-15',
          duration: '1 hour',
          guests: 2,
          rating: 4,
          status: 'completed',
          description: 'Premium car service from airport to resort',
          image: null,
          review: 'Punctual and comfortable ride',
          photos: []
        },
        {
          id: 3,
          title: 'Sunset Cruise Dinner',
          category: 'activities',
          destination: 'Goa',
          usedDate: '2024-01-16',
          duration: '3 hours',
          guests: 2,
          rating: 5,
          status: 'completed',
          description: 'Romantic sunset cruise with dinner and live music',
          image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
          review: 'Unforgettable experience with stunning sunset views',
          photos: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          ]
        },
        {
          id: 4,
          title: 'Spa & Wellness Package',
          category: 'special_service',
          destination: 'Kerala',
          usedDate: '2023-12-15',
          duration: '2 hours',
          guests: 2,
          rating: 5,
          status: 'completed',
          description: 'Traditional Ayurvedic massage and wellness treatment',
          image: null,
          review: 'Very relaxing and rejuvenating experience',
          photos: []
        },
        {
          id: 5,
          title: 'Local Cuisine Food Tour',
          category: 'dining',
          destination: 'Rajasthan',
          usedDate: '2023-12-12',
          duration: '4 hours',
          guests: 2,
          rating: 4,
          status: 'completed',
          description: 'Guided food tour exploring authentic Rajasthani cuisine',
          image: null,
          review: 'Great way to experience local flavors and culture',
          photos: []
        },
        {
          id: 6,
          title: 'Travel Insurance',
          category: 'insurance',
          destination: 'Multiple',
          usedDate: '2023-12-01',
          duration: 'Annual',
          guests: 4,
          rating: 4,
          status: 'completed',
          description: 'Comprehensive travel insurance coverage for family',
          image: null,
          review: 'Good coverage and easy claim process',
          photos: []
        }
      ]
    });
  },

  getBalanceData: async () => {
    await simulateDelay();
    return createResponse({
      balance: {
        current: 28500,
        pending: 5000,
        totalEarned: 15000,
        totalSpent: 285000,
        loyaltyPoints: 3850,
        monthlySpending: [
          { month: 'Jan', amount: 25000 },
          { month: 'Dec', amount: 60000 },
          { month: 'Nov', amount: 8500 },
          { month: 'Oct', amount: 15000 }
        ]
      },
      transactions: [
        {
          id: 1,
          type: 'debit',
          description: 'Maldives Water Villa Resort Payment',
          amount: 85000,
          date: '2024-01-20',
          method: 'Platinum Wallet',
          orderId: 'WA2024001',
          balance: 28500
        },
        {
          id: 2,
          type: 'credit',
          description: 'Premium Wallet Recharge',
          amount: 50000,
          date: '2024-01-15',
          method: 'Premium Credit Card',
          orderId: null,
          balance: 113500
        },
        {
          id: 3,
          type: 'debit',
          description: 'Switzerland Alps Tour Payment',
          amount: 125000,
          date: '2024-01-10',
          method: 'Platinum Wallet',
          orderId: 'WA2024002',
          balance: 63500
        },
        {
          id: 4,
          type: 'refund',
          description: 'Cancelled Hotel Booking Refund',
          amount: 5000,
          date: '2024-01-02',
          method: 'Wallet',
          orderId: 'WA2023099',
          balance: 65000
        },
        {
          id: 5,
          type: 'credit',
          description: 'Membership Cashback',
          amount: 2500,
          date: '2023-12-25',
          method: 'Wallet',
          orderId: null,
          balance: 60000
        },
        {
          id: 6,
          type: 'debit',
          description: 'Premium Membership Purchase',
          amount: 15000,
          date: '2023-12-20',
          method: 'Wallet',
          orderId: 'WA2024003',
          balance: 57500
        },
        {
          id: 7,
          type: 'reward',
          description: 'Loyalty Points Redemption',
          amount: 1500,
          date: '2023-12-18',
          method: 'Points',
          orderId: null,
          balance: 72500
        },
        {
          id: 8,
          type: 'debit',
          description: 'Rajasthan Heritage Tour',
          amount: 45000,
          date: '2023-12-10',
          method: 'Wallet',
          orderId: 'WA2024004',
          balance: 71000
        },
        {
          id: 9,
          type: 'credit',
          description: 'Wallet Recharge',
          amount: 50000,
          date: '2023-12-05',
          method: 'Bank Transfer',
          orderId: null,
          balance: 116000
        },
        {
          id: 10,
          type: 'debit',
          description: 'Flight Booking Payment',
          amount: 8500,
          date: '2023-11-25',
          method: 'Wallet',
          orderId: 'WA2024005',
          balance: 66000
        }
      ]
    });
  }
};