'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Plane,
  Star,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Gift,
  Award,
  Users,
  Camera,
  Heart,
  Globe,
  CreditCard,
  FileText,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { dashboardAPI } from '@/lib/staticApi';
import Link from 'next/link';

const UserDashboardHome = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardAPI.getOverview();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDocumentStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return { status: 'expired', color: 'red', text: 'Expired', days: Math.abs(daysUntilExpiry) };
    if (daysUntilExpiry < 90) return { status: 'expiring', color: 'yellow', text: 'Expiring Soon', days: daysUntilExpiry };
    return { status: 'valid', color: 'green', text: 'Valid', days: daysUntilExpiry };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const recentActivities = dashboardData?.recentActivities || [];
  const upcomingTrips = dashboardData?.upcomingTrips || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section - Personalized Welcome */}
      <section className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-20 overflow-hidden">
        {/* Background overlay for better contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Users size={40} className="text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-white">
                  Welcome back, {user.firstName}! 👋
                </h1>
                <p className="text-xl text-gray-300">
                  {user.membership.type} {user.membership.level} Member • Ready for your next adventure?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-yellow-400 bg-opacity-20 rounded-full p-3">
                    <Wallet className="h-8 w-8 text-yellow-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">₹{user.account.balance.toLocaleString()}</p>
                <p className="text-gray-300 text-sm font-medium">Current Balance</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-green-400 bg-opacity-20 rounded-full p-3">
                    <Plane className="h-8 w-8 text-green-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{user.recentActivity.totalTrips}</p>
                <p className="text-gray-300 text-sm font-medium">Total Trips</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-purple-400 bg-opacity-20 rounded-full p-3">
                    <Globe className="h-8 w-8 text-purple-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{user.recentActivity.countriesVisited}</p>
                <p className="text-gray-300 text-sm font-medium">Countries</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-2xl p-6 border border-gray-700 shadow-lg hover:bg-gray-700 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="bg-yellow-400 bg-opacity-20 rounded-full p-3">
                    <Star className="h-8 w-8 text-yellow-300" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{user.membership.loyaltyPoints.toLocaleString()}</p>
                <p className="text-gray-300 text-sm font-medium">Loyalty Points</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-10">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="/packages" className="group">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-800 transition-colors">
                    <Plane className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Book New Trip</h3>
                  <p className="text-gray-400 text-sm">Explore amazing destinations</p>
                </div>
              </Link>

              <Link href="/dashboard?tab=balance" className="group">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-green-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-800 transition-colors">
                    <Plus className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Add Funds</h3>
                  <p className="text-gray-400 text-sm">Top up your wallet</p>
                </div>
              </Link>

              <Link href="/dashboard?tab=purchases" className="group">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-purple-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-800 transition-colors">
                    <Calendar className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">My Bookings</h3>
                  <p className="text-gray-400 text-sm">View your trips</p>
                </div>
              </Link>

              <Link href="/dashboard?tab=referrals" className="group">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-700 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-yellow-900 bg-opacity-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-800 transition-colors">
                    <Gift className="h-8 w-8 text-yellow-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Refer a Friend</h3>
                  <p className="text-gray-400 text-sm">Earn rewards and discounts</p>
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column - Recent Activity & Upcoming Trips */}
            <div className="lg:col-span-2 space-y-8">

              {/* Upcoming Trips */}
              {upcomingTrips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Upcoming Trips</h3>
                    <Link href="/dashboard?tab=purchases" className="text-blue-400 hover:text-blue-500 text-sm font-medium flex items-center">
                      View All <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {upcomingTrips.map((trip, index) => (
                      <div key={index} className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{trip.destination}</h4>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${trip.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            trip.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                            {trip.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{trip.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{trip.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                  <Link href="/dashboard?tab=purchases" className="text-blue-400 hover:text-blue-500 text-sm font-medium flex items-center">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentActivities.slice(0, 4).map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                      <div className={`p-2 rounded-full ${activity.type === 'purchase' ? 'bg-blue-900' :
                        activity.type === 'service' ? 'bg-green-900' : 'bg-purple-900'
                        }`}>
                        {activity.type === 'purchase' && <Plane size={16} className="text-blue-400" />}
                        {activity.type === 'service' && <MapPin size={16} className="text-green-400" />}
                        {activity.type === 'payment' && <Wallet size={16} className="text-purple-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{activity.title}</p>
                        <p className="text-sm text-gray-400">{activity.date}</p>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <p className="font-semibold text-white">₹{activity.amount.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - User Info & Alerts */}
            <div className="space-y-8">

              {/* Membership Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-black"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{user.membership.type} Member</h3>
                    <p className="text-yellow-100">{user.membership.level} Level</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-200" />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-100">Valid Until</span>
                    <span className="font-medium">{formatDate(user.membership.validUntil)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-100">Member ID</span>
                    <span className="font-mono text-xs">{user.membership.membershipId}</span>
                  </div>
                </div>

                <Link href="/dashboard?tab=profile" className="inline-flex items-center text-sm font-medium hover:underline">
                  View Details <ArrowRight size={14} className="ml-1" />
                </Link>
              </motion.div>

              {/* Document Alerts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Document Status
                </h3>

                <div className="space-y-3">
                  {/* Passport Status */}
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Passport</p>
                      <p className="text-sm text-gray-400">{user.documents.passport.number}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(user.documents.passport.expiryDate).color === 'green'
                      ? 'bg-green-100 text-green-700'
                      : getDocumentStatus(user.documents.passport.expiryDate).color === 'yellow'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                      {getDocumentStatus(user.documents.passport.expiryDate).text}
                    </span>
                  </div>

                  {/* Visa Status */}
                  {user.documents.visa.slice(0, 2).map((visa, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{visa.country} Visa</p>
                        <p className="text-sm text-gray-400">{visa.number}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(visa.validUntil).color === 'green'
                        ? 'bg-green-100 text-green-700'
                        : getDocumentStatus(visa.validUntil).color === 'yellow'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                        {getDocumentStatus(visa.validUntil).text}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard?tab=profile" className="inline-flex items-center text-blue-400 hover:text-blue-500 text-sm font-medium mt-4">
                  Manage Documents <ArrowRight size={14} className="ml-1" />
                </Link>
              </motion.div>

              {/* Travel Preferences */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Your Preferences
                </h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Travel Style</p>
                    <p className="font-medium text-white">{user.preferences.travelStyle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Preferred Destinations</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.preferences.preferredDestinations.slice(0, 3).map((dest, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-900 text-blue-300 rounded-full text-xs">
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Budget Range</p>
                    <p className="font-medium text-white">₹{user.preferences.budgetRange}</p>
                  </div>
                </div>

                <Link href="/packages" className="inline-flex items-center text-blue-400 hover:text-blue-500 text-sm font-medium mt-4">
                  Find Matching Packages <ArrowRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboardHome;