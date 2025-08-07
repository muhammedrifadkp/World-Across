'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  CreditCard,
  Gift,
  Plane
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { dashboardAPI } from '@/lib/staticApi';

const DashboardOverview = () => {
  const { user } = useAuth();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalPurchases: 0,
    totalSpent: 0,
    availedServices: 0,
    currentBalance: 0,
    membershipStatus: 'Active',
    loyaltyPoints: 0
  };

  const recentActivities = dashboardData?.recentActivities || [];
  const upcomingTrips = dashboardData?.upcomingTrips || [];

  const statCards = [
    {
      title: 'Current Balance',
      value: `₹${stats.currentBalance.toLocaleString()}`,
      icon: Wallet,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Total Purchases',
      value: stats.totalPurchases.toString(),
      icon: ShoppingBag,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Services Availed',
      value: stats.availedServices.toString(),
      icon: MapPin,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Spent',
      value: `₹${stats.totalSpent.toLocaleString()}`,
      icon: CreditCard,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h2>
            <p className="text-blue-100 mb-4">
              Here's what's happening with your account today
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">Membership: {stats.membershipStatus}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-yellow-300" />
                <span className="text-sm">{stats.loyaltyPoints} Loyalty Points</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Plane className="h-24 w-24 text-blue-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.length > 0 ? (
              recentActivities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${activity.type === 'purchase' ? 'bg-blue-100' : 
                    activity.type === 'service' ? 'bg-green-100' : 'bg-purple-100'}`}>
                    {activity.type === 'purchase' && <ShoppingBag size={16} className="text-blue-600" />}
                    {activity.type === 'service' && <MapPin size={16} className="text-green-600" />}
                    {activity.type === 'payment' && <Wallet size={16} className="text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {activity.amount && `₹${activity.amount.toLocaleString()}`}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent activities</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Trips */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Trips</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingTrips.length > 0 ? (
              upcomingTrips.slice(0, 3).map((trip, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{trip.destination}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      trip.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      trip.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{trip.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-2">No upcoming trips</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Browse Packages
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <ShoppingBag className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">New Booking</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Wallet className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">Add Funds</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <MapPin className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Explore</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <Star className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-700">Reviews</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
