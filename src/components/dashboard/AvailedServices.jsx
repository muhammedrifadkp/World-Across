'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Users, 
  Clock, 
  CheckCircle,
  Camera,
  MessageSquare,
  Download,
  Filter,
  Search,
  Plane,
  Hotel,
  Car,
  Utensils,
  Activity,
  Shield,
  Gift,
  Award
} from 'lucide-react';
import { dashboardAPI } from '@/lib/staticApi';

const AvailedServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await dashboardAPI.getAvailedServices();
        setServices(response.data.services || []);
        setFilteredServices(response.data.services || []);
      } catch (error) {
        console.error('Error fetching availed services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = [...services];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(service => service.category === categoryFilter);
    }

    setFilteredServices(filtered);
  }, [services, searchQuery, categoryFilter]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'accommodation':
        return <Hotel className="h-5 w-5" />;
      case 'transportation':
        return <Plane className="h-5 w-5" />;
      case 'dining':
        return <Utensils className="h-5 w-5" />;
      case 'activities':
        return <Activity className="h-5 w-5" />;
      case 'insurance':
        return <Shield className="h-5 w-5" />;
      case 'car_rental':
        return <Car className="h-5 w-5" />;
      case 'special_service':
        return <Gift className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'accommodation':
        return 'bg-blue-100 text-blue-700';
      case 'transportation':
        return 'bg-purple-100 text-purple-700';
      case 'dining':
        return 'bg-orange-100 text-orange-700';
      case 'activities':
        return 'bg-green-100 text-green-700';
      case 'insurance':
        return 'bg-red-100 text-red-700';
      case 'car_rental':
        return 'bg-yellow-100 text-yellow-700';
      case 'special_service':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Availed Services</h2>
          <p className="text-gray-600 mt-1">Services you've used during your travels</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
              <p className="text-sm text-gray-600">Total Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {services.filter(s => s.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {services.length > 0 ? (services.reduce((acc, s) => acc + (s.rating || 0), 0) / services.length).toFixed(1) : '0'}
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {services.filter(s => s.rating >= 4).length}
              </p>
              <p className="text-sm text-gray-600">Highly Rated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="accommodation">Accommodation</option>
            <option value="transportation">Transportation</option>
            <option value="dining">Dining</option>
            <option value="activities">Activities</option>
            <option value="insurance">Insurance</option>
            <option value="car_rental">Car Rental</option>
            <option value="special_service">Special Services</option>
          </select>

          {/* Results Count */}
          <div className="flex items-center justify-center bg-gray-50 rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">
              {filteredServices.length} of {services.length} services
            </span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start space-x-4">
                {/* Service Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {service.image ? (
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getCategoryIcon(service.category)}
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {service.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                          {service.category.replace('_', ' ').toUpperCase()}
                        </span>
                        {service.destination && (
                          <div className="flex items-center space-x-1">
                            <MapPin size={14} />
                            <span>{service.destination}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium text-green-700">Completed</span>
                      </div>
                      {service.rating && renderRating(service.rating)}
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{service.usedDate}</span>
                    </div>
                    {service.duration && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{service.duration}</span>
                      </div>
                    )}
                    {service.guests && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{service.guests} Guests</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {service.description && (
                    <p className="text-sm text-gray-700 mb-4">{service.description}</p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Camera size={16} />
                      <span>View Photos</span>
                    </button>
                    {!service.reviewed && (
                      <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium">
                        <MessageSquare size={16} />
                        <span>Write Review</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 text-sm font-medium">
                      <Download size={16} />
                      <span>Download Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || categoryFilter !== 'all' 
                ? 'Try adjusting your filters to see more results.'
                : 'You haven\'t used any services yet. Book a package to start your journey!'
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Explore Packages
            </button>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Service Details</h3>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Service Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">{selectedService.title}</h4>
                    <p className="text-gray-700 mb-4">{selectedService.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar size={16} className="text-gray-400" />
                        <span>Used on: {selectedService.usedDate}</span>
                      </div>
                      {selectedService.duration && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock size={16} className="text-gray-400" />
                          <span>Duration: {selectedService.duration}</span>
                        </div>
                      )}
                      {selectedService.guests && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Users size={16} className="text-gray-400" />
                          <span>Guests: {selectedService.guests}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    {selectedService.rating && (
                      <div className="mb-4">
                        <h5 className="font-medium text-gray-900 mb-2">Your Rating</h5>
                        {renderRating(selectedService.rating)}
                      </div>
                    )}
                    
                    {selectedService.review && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Your Review</h5>
                        <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg">
                          {selectedService.review}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Photos */}
                {selectedService.photos && selectedService.photos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Photos</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedService.photos.map((photo, index) => (
                        <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={photo} 
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AvailedServices;
