'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  CreditCard, 
  MapPin, 
  Calendar, 
  Plane, 
  Star,
  Shield,
  Phone,
  Mail,
  FileText,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Globe,
  Heart,
  Camera,
  Gift,
  Wallet,
  Users,
  Home,
  ChevronRight
} from 'lucide-react';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const getDocumentStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', color: 'red', text: 'Expired' };
    if (daysUntilExpiry < 90) return { status: 'expiring', color: 'yellow', text: 'Expiring Soon' };
    return { status: 'valid', color: 'green', text: 'Valid' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'membership', label: 'Membership', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'activity', label: 'Activity', icon: TrendingUp }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <User size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.firstName}!</h2>
            <p className="text-blue-100">
              {user.membership.type} Member • {user.membership.level} Level
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="text-sm">{user.membership.loyaltyPoints} Points</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4 text-blue-200" />
                <span className="text-sm">{user.recentActivity.countriesVisited} Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Balance</p>
              <p className="font-bold text-gray-900">₹{user.account.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plane className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="font-bold text-gray-900">{user.recentActivity.totalTrips}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="font-bold text-gray-900">{formatDate(user.membership.memberSince)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="font-bold text-gray-900">₹{user.account.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Last Booking</p>
                <p className="text-sm text-gray-600">{user.recentActivity.lastBooking.destination}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">₹{user.recentActivity.lastBooking.amount.toLocaleString()}</p>
              <p className="text-sm text-green-600">{user.recentActivity.lastBooking.status}</p>
            </div>
          </div>

          {user.recentActivity.upcomingTrip && (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Upcoming Trip</p>
                  <p className="text-sm text-gray-600">{user.recentActivity.upcomingTrip.destination}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{user.recentActivity.upcomingTrip.daysLeft} days</p>
                <p className="text-sm text-green-600">to go</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium text-gray-900">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Home className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium text-gray-900">{user.address.city}, {user.address.state}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">Emergency Contact</p>
              <p className="font-medium text-gray-900">{user.emergencyContact.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembership = () => (
    <div className="space-y-6">
      {/* Membership Card */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{user.membership.type} Membership</h2>
            <p className="text-yellow-100">{user.membership.level} Level</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-yellow-100">Member ID</p>
            <p className="font-mono text-lg">{user.membership.membershipId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-yellow-100">Valid Until</p>
            <p className="font-bold text-lg">{formatDate(user.membership.validUntil)}</p>
          </div>
          <div>
            <p className="text-sm text-yellow-100">Loyalty Points</p>
            <p className="font-bold text-lg">{user.membership.loyaltyPoints}</p>
          </div>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-900">Current: {user.membership.tierProgress.current}</span>
            <span className="text-sm text-gray-600">Next: {user.membership.tierProgress.next}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
          <p className="text-sm text-gray-600">
            {user.membership.tierProgress.pointsNeeded} more points to reach {user.membership.tierProgress.next}
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Benefits</h3>
        <div className="space-y-3">
          {user.membership.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Passport */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Passport</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            getDocumentStatus(user.documents.passport.expiryDate).color === 'green'
              ? 'bg-green-100 text-green-700'
              : getDocumentStatus(user.documents.passport.expiryDate).color === 'yellow'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {getDocumentStatus(user.documents.passport.expiryDate).text}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Passport Number</p>
            <p className="font-medium text-gray-900">{user.documents.passport.number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Issuing Country</p>
            <p className="font-medium text-gray-900">{user.documents.passport.issuingCountry}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Issue Date</p>
            <p className="font-medium text-gray-900">{formatDate(user.documents.passport.issueDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expiry Date</p>
            <p className="font-medium text-gray-900">{formatDate(user.documents.passport.expiryDate)}</p>
          </div>
        </div>
      </div>

      {/* Visas */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visas</h3>
        <div className="space-y-4">
          {user.documents.visa.map((visa, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{visa.country} - {visa.type}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getDocumentStatus(visa.validUntil).color === 'green'
                    ? 'bg-green-100 text-green-700'
                    : getDocumentStatus(visa.validUntil).color === 'yellow'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {getDocumentStatus(visa.validUntil).text}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Visa Number</p>
                  <p className="font-medium text-gray-900">{visa.number}</p>
                </div>
                <div>
                  <p className="text-gray-600">Valid Until</p>
                  <p className="font-medium text-gray-900">{formatDate(visa.validUntil)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Documents */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Documents</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">PAN Card</p>
            <p className="font-medium text-gray-900">{user.documents.panCard}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Aadhar Card</p>
            <p className="font-medium text-gray-900">{user.documents.aadharCard}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      {/* Travel Style */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Preferred Destinations</p>
            <div className="flex flex-wrap gap-2">
              {user.preferences.preferredDestinations.map((dest, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {dest}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Travel Style</p>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
              {user.preferences.travelStyle}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Budget Range</p>
            <p className="font-medium text-gray-900">₹{user.preferences.budgetRange}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Accommodation Type</p>
            <p className="font-medium text-gray-900">{user.preferences.accommodationType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Meal Preference</p>
            <p className="font-medium text-gray-900">{user.preferences.mealPreference}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Travel Companions</p>
            <p className="font-medium text-gray-900">{user.preferences.travelCompanions}</p>
          </div>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requirements</h3>
        <div className="flex flex-wrap gap-2">
          {user.preferences.specialRequirements.map((req, index) => (
            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {req}
            </span>
          ))}
        </div>
      </div>

      {/* Languages & Currency */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages & Currency</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {user.preferences.languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Preferred Currency</p>
            <p className="font-medium text-gray-900">{user.preferences.currency}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      {/* Account Status */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Account Status</p>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-700">{user.account.accountStatus}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Login</p>
            <p className="font-medium text-gray-900">{formatDate(user.account.lastLogin)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Credit Limit</p>
            <p className="font-medium text-gray-900">₹{user.account.creditLimit.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Savings</p>
            <p className="font-medium text-gray-900">₹{user.account.totalSavings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
        <div className="space-y-3">
          {Object.entries(user.account.verificationStatus).map(([key, verified]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div className="flex items-center space-x-2">
                {verified ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-green-700 text-sm font-medium">Verified</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <span className="text-yellow-700 text-sm font-medium">Pending</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Statistics */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Statistics</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{user.recentActivity.totalTrips}</p>
            <p className="text-sm text-gray-600">Total Trips</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{user.recentActivity.countriesVisited}</p>
            <p className="text-sm text-gray-600">Countries Visited</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{user.membership.loyaltyPoints}</p>
            <p className="text-sm text-gray-600">Loyalty Points</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                <p className="text-gray-600">Complete account information</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'membership' && renderMembership()}
                {activeTab === 'documents' && renderDocuments()}
                {activeTab === 'preferences' && renderPreferences()}
                {activeTab === 'activity' && renderActivity()}
              </motion.div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Your data is secure and encrypted</span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Continue to Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserDetailsModal;
