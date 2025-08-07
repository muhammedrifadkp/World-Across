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

const UserDashboard = ({ user }) => {
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
        <div className="min-h-screen bg-white text-black">
            <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-white">
                            Welcome back, {user.firstName}! 👋
                        </h1>
                        <p className="text-xl text-gray-200">
                            {user.membership.type} {user.membership.level} Member • Ready for your next adventure?
                        </p>
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
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <Link href="/packages" className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                                        <Plane className="h-8 w-8 text-blue-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Book New Trip</h3>
                                    <p className="text-gray-500 text-sm">Explore amazing destinations</p>
                                </div>
                            </Link>

                            <Link href="/dashboard?tab=balance" className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                                        <Plus className="h-8 w-8 text-green-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Add Funds</h3>
                                    <p className="text-gray-500 text-sm">Top up your wallet</p>
                                </div>
                            </Link>

                            <Link href="/dashboard?tab=purchases" className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                                        <Calendar className="h-8 w-8 text-purple-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">My Bookings</h3>
                                    <p className="text-gray-500 text-sm">View your trips</p>
                                </div>
                            </Link>

                            <Link href="/dashboard?tab=referrals" className="group">
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all duration-300 text-center">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors">
                                        <Gift className="h-8 w-8 text-yellow-500" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Refer a Friend</h3>
                                    <p className="text-gray-500 text-sm">Earn rewards and discounts</p>
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
                                    className="bg-white rounded-xl p-6 shadow-lg"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Upcoming Trips</h3>
                                        <Link href="/dashboard?tab=purchases" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                            View All <ArrowRight size={16} className="ml-1" />
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {upcomingTrips.map((trip, index) => (
                                            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-semibold text-gray-900">{trip.destination}</h4>
                                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                        trip.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {trip.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
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
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                                    <Link href="/dashboard?tab=purchases" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                                        View All <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    {recentActivities.slice(0, 4).map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-100 rounded-lg">
                                            <div className={`p-2 rounded-full ${activity.type === 'purchase' ? 'bg-blue-200' :
                                                activity.type === 'service' ? 'bg-green-200' : 'bg-purple-200'
                                                }`}>
                                                {activity.type === 'purchase' && <Plane size={16} className="text-blue-600" />}
                                                {activity.type === 'service' && <MapPin size={16} className="text-green-600" />}
                                                {activity.type === 'payment' && <Wallet size={16} className="text-purple-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{activity.title}</p>
                                                <p className="text-sm text-gray-500">{activity.date}</p>
                                            </div>
                                            {activity.amount && (
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900">₹{activity.amount.toLocaleString()}</p>
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
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Document Status
                                </h3>

                                <div className="space-y-3">
                                    {/* Passport Status */}
                                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Passport</p>
                                            <p className="text-sm text-gray-500">{user.documents.passport.number}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(user.documents.passport.expiryDate).color === 'green'
                                            ? 'bg-green-100 text-green-800'
                                            : getDocumentStatus(user.documents.passport.expiryDate).color === 'yellow'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {getDocumentStatus(user.documents.passport.expiryDate).text}
                                        </span>
                                    </div>

                                    {/* Visa Status */}
                                    {user.documents.visa.slice(0, 2).map((visa, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{visa.country} Visa</p>
                                                <p className="text-sm text-gray-500">{visa.number}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDocumentStatus(visa.validUntil).color === 'green'
                                                ? 'bg-green-100 text-green-800'
                                                : getDocumentStatus(visa.validUntil).color === 'yellow'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {getDocumentStatus(visa.validUntil).text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/dashboard?tab=profile" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
                                    Manage Documents <ArrowRight size={14} className="ml-1" />
                                </Link>
                            </motion.div>

                            {/* Travel Preferences */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-white rounded-xl p-6 shadow-lg"
                            >
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                    <Heart className="h-5 w-5 mr-2" />
                                    Your Preferences
                                </h3>

                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Travel Style</p>
                                        <p className="font-medium text-gray-900">{user.preferences.travelStyle}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Preferred Destinations</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {user.preferences.preferredDestinations.slice(0, 3).map((dest, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                    {dest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Budget Range</p>
                                        <p className="font-medium text-gray-900">₹{user.preferences.budgetRange}</p>
                                    </div>
                                </div>

                                <Link href="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
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

export default UserDashboard;