'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Star, Calendar, Clock, ArrowRight, Filter, Search } from 'lucide-react';
import { destinationAPI } from '@/lib/staticApi';
import ClientOnly from '@/components/ClientOnly';
import Link from 'next/link';

const DestinationsPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Beach', 'Adventure', 'Heritage', 'Luxury', 'Family', 'Honeymoon', 'Spiritual', 'Cultural'];
  const types = ['All', 'Domestic', 'International'];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await destinationAPI.getAll();
        setDestinations(response.data.destinations || []);
        setFilteredDestinations(response.data.destinations || []);
      } catch (error) {
        console.log('Error fetching destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let filtered = [...destinations];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dest => 
        dest.categories.includes(selectedCategory)
      );
    }

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(dest => 
        dest.types.includes(selectedType)
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDestinations(filtered);
  }, [destinations, selectedCategory, selectedType, searchQuery]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Explore Amazing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Destinations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking destinations around the world. From pristine beaches to majestic mountains, 
            find your perfect getaway with our curated collection of travel experiences.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Filter size={16} className="mr-2" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MapPin size={16} className="mr-2" />
                Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedType === type
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <p className="text-gray-600">
            Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {selectedType !== 'All' && ` (${selectedType})`}
          </p>
        </motion.div>

        {/* Destinations Grid */}
        <ClientOnly fallback={<div className="text-center">Loading destinations...</div>}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.mainImage}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                      destination.types.includes('International') 
                        ? 'bg-purple-600' 
                        : 'bg-blue-600'
                    }`}>
                      {destination.types[0]}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center">
                    <Star size={14} className="text-yellow-500 mr-1" />
                    <span className="text-sm font-bold text-gray-900">{destination.avgRating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span>{destination.city}, {destination.country}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{destination.packageCount}</div>
                      <div className="text-xs text-gray-500">Packages</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {formatPrice(destination.priceRange.min)}+
                      </div>
                      <div className="text-xs text-gray-500">Starting from</div>
                    </div>
                  </div>

                  {/* Best Time */}
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar size={14} className="mr-2" />
                    <span>Best time: {destination.bestTime}</span>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.categories.slice(0, 3).map((category, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                    {destination.categories.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{destination.categories.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link href={`/destinations/${destination.id}`}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
                      <span>Explore {destination.name}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ClientOnly>

        {/* No Results */}
        {filteredDestinations.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedType('All');
                setSearchQuery('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DestinationsPage;
