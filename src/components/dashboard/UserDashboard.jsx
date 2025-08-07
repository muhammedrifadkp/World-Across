'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    Eye,
    Calendar,
    MapPin,
    CreditCard,
    CheckCircle,
    Clock,
    XCircle,
    AlertCircle,
    Package,
    Star,
    Users,
    Plane
} from 'lucide-react';
import { dashboardAPI } from '@/lib/staticApi';

const UserDashboard = () => {
    const [purchases, setPurchases] = useState([]);
    const [filteredPurchases, setFilteredPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await dashboardAPI.getPurchaseHistory();
                setPurchases(response.data.purchases || []);
                setFilteredPurchases(response.data.purchases || []);
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    useEffect(() => {
        let filtered = [...purchases];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(purchase =>
                purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                purchase.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                purchase.orderId.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(purchase => purchase.status === statusFilter);
        }

        // Type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter(purchase => purchase.type === typeFilter);
        }

        setFilteredPurchases(filtered);
    }, [purchases, searchQuery, statusFilter, typeFilter]);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'confirmed':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'pending':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'cancelled':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-blue-500" />;
            default:
                return <AlertCircle className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 text-red-700';
            case 'completed':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'package':
                return <Package className="h-5 w-5 text-blue-500" />;
            case 'hotel':
                return <MapPin className="h-5 w-5 text-green-500" />;
            case 'flight':
                return <Plane className="h-5 w-5 text-purple-500" />;
            case 'membership':
                return <Star className="h-5 w-5 text-orange-500" />;
            default:
                return <Package className="h-5 w-5 text-gray-500" />;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="hidden">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Purchase History</h2>
                    <p className="text-gray-600 mt-1">Track all your bookings and purchases</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search purchases..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="all">All Types</option>
                        <option value="package">Travel Packages</option>
                        <option value="hotel">Hotels</option>
                        <option value="flight">Flights</option>
                        <option value="membership">Membership</option>
                    </select>

                    {/* Results Count */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
                        <span className="text-sm text-gray-600">
                            {filteredPurchases.length} of {purchases.length} purchases
                        </span>
                    </div>
                </div>
            </div>

            {/* Purchase List */}
            <div className="space-y-4">
                {filteredPurchases.length > 0 ? (
                    filteredPurchases.map((purchase, index) => (
                        <motion.div
                            key={purchase.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4 flex-1">
                                    {/* Type Icon */}
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        {getTypeIcon(purchase.type)}
                                    </div>

                                    {/* Purchase Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                    {purchase.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2">
                                                    Order ID: {purchase.orderId}
                                                </p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(purchase.status)}`}>
                                                    {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                                                </span>
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₹{purchase.amount.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Purchase Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                            {purchase.destination && (
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <MapPin size={16} />
                                                    <span>{purchase.destination}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <Calendar size={16} />
                                                <span>{purchase.date}</span>
                                            </div>
                                            {purchase.guests && (
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <Users size={16} />
                                                    <span>{purchase.guests} Guests</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Additional Details */}
                                        {purchase.details && (
                                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                                <p className="text-sm text-gray-700">{purchase.details}</p>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => setSelectedPurchase(purchase)}
                                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                <Eye size={16} />
                                                <span>View Details</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm font-medium">
                                                <Download size={16} />
                                                <span>Download Invoice</span>
                                            </button>
                                            {purchase.status === 'confirmed' && (
                                                <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium">
                                                    <CheckCircle size={16} />
                                                    <span>Mark as Used</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases found</h3>
                        <p className="text-gray-600 mb-6">
                            {searchQuery || statusFilter !== 'all' || typeFilter !== 'all'
                                ? 'Try adjusting your filters to see more results.'
                                : 'You haven\'t made any purchases yet. Start exploring our amazing packages!'
                            }
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                            Browse Packages
                        </button>
                    </div>
                )}
            </div>

            {/* Purchase Detail Modal */}
            {selectedPurchase && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-900">Purchase Details</h3>
                                <button
                                    onClick={() => setSelectedPurchase(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Purchase Summary */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Order ID</p>
                                            <p className="font-medium">{selectedPurchase.orderId}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(selectedPurchase.status)}
                                                <span className="font-medium">{selectedPurchase.status}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Amount</p>
                                            <p className="font-medium">₹{selectedPurchase.amount.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-medium">{selectedPurchase.date}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Details */}
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Package Details</h4>
                                    <p className="text-gray-700">{selectedPurchase.details}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-4 pt-4 border-t border-gray-200">
                                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Download Invoice
                                    </button>
                                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        Contact Support
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;