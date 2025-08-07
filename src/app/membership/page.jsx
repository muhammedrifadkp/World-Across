'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Crown, Gift, Check, ArrowRight } from 'lucide-react';
import { membershipAPI } from '@/lib/staticApi';
import ClientOnly from '@/components/ClientOnly';

const MembershipPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const response = await membershipAPI.getAll();
        setMemberships(response.data.memberships || []);
      } catch (error) {
        console.log('Using fallback data for memberships');
        // Fallback data for UI/UX demo
        setMemberships(fallbackMemberships);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, []);

  const fallbackMemberships = [
    {
      _id: '1',
      name: 'Explorer',
      tenure: '10 Years',
      nightsPerYear: '7 Days / 6 Nights',
      originalPrice: 685000,
      discountedPrice: 485000,
      discount: '29% OFF',
      isPopular: false,
      features: [
        'Access to 500+ resorts worldwide',
        'Complimentary breakfast & dinner',
        'Free WiFi at all properties',
        '24/7 customer support',
        'Flexible booking options',
        'No blackout dates',
        'Transfer facility available'
      ],
      bonusOffer: 'Free 3 Night Goa Stay with Cruise',
      icon: 'Star',
      color: 'from-blue-500 to-blue-600',
      maxBookingsPerYear: 1,
      resortAccess: 500
    },
    {
      _id: '2',
      name: 'Adventurer',
      tenure: '25 Years',
      nightsPerYear: '7 Days / 6 Nights',
      originalPrice: 985000,
      discountedPrice: 785000,
      discount: '20% OFF',
      isPopular: true,
      features: [
        'Access to 800+ premium resorts',
        'All meals included (B/L/D)',
        'Premium room upgrades',
        'Concierge services',
        'Priority booking',
        'Exclusive member events',
        'Airport transfers included',
        'Spa & wellness credits'
      ],
      bonusOffer: 'Free 5 Night Dubai Stay + Cruise Package',
      icon: 'Crown',
      color: 'from-purple-500 to-purple-600',
      maxBookingsPerYear: 1,
      resortAccess: 800
    },
    {
      _id: '3',
      name: 'Elite',
      tenure: 'Lifetime',
      nightsPerYear: '10 Days / 9 Nights',
      originalPrice: 1500000,
      discountedPrice: 1285000,
      discount: '14% OFF',
      isPopular: false,
      features: [
        'Access to 1000+ luxury resorts',
        'All-inclusive packages',
        'Suite upgrades guaranteed',
        'Personal travel concierge',
        'Unlimited bookings per year',
        'VIP airport lounge access',
        'Private transfers',
        'Exclusive dining experiences',
        'Annual bonus nights'
      ],
      bonusOffer: 'Free International Honeymoon Package',
      icon: 'Gift',
      color: 'from-gold-500 to-yellow-600',
      maxBookingsPerYear: 2,
      resortAccess: 1000
    }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Crown':
        return Crown;
      case 'Gift':
        return Gift;
      default:
        return Star;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Membership
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock exclusive travel experiences with our membership plans. 
            Enjoy premium resorts, special discounts, and unforgettable journeys.
          </p>
        </motion.div>

        {/* Membership Plans */}
        <ClientOnly fallback={<div className="text-center">Loading memberships...</div>}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {(memberships.length > 0 ? memberships : fallbackMemberships).map((membership) => {
              const IconComponent = getIcon(membership.icon);
              return (
                <motion.div
                  key={membership._id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    membership.isPopular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {membership.isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${membership.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent size={32} className="text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
                    {membership.name}
                  </h3>

                  {/* Tenure */}
                  <p className="text-gray-600 text-center mb-6">
                    {membership.tenure} • {membership.nightsPerYear}
                  </p>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-gray-500 line-through text-lg">
                        {formatPrice(membership.originalPrice)}
                      </span>
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                        {membership.discount}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(membership.discountedPrice)}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">One-time payment</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {membership.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bonus Offer */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-8">
                    <h4 className="font-bold text-orange-800 mb-2">🎁 Bonus Offer</h4>
                    <p className="text-orange-700 text-sm">{membership.bonusOffer}</p>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full bg-gradient-to-r ${membership.color} text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}>
                    <span>Choose {membership.name}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </ClientOnly>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose World Across Membership?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <p className="text-gray-600">Premium Resorts Worldwide</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <p className="text-gray-600">Happy Members</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-600">Customer Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipPage;
