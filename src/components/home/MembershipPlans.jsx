'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Star, Crown, Gift, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MembershipPlans = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const plans = [
    {
      id: 1,
      name: "Explorer",
      tenure: "10 Years",
      nights: "7 Days / 6 Nights",
      originalPrice: "₹6,85,000",
      price: "₹4,85,000",
      discount: "29% OFF",
      popular: false,
      icon: Star,
      color: "from-blue-500 to-blue-600",
      features: [
        "Access to 500+ resorts worldwide",
        "Complimentary breakfast & dinner",
        "Free WiFi at all properties",
        "24/7 customer support",
        "Flexible booking options",
        "No blackout dates",
        "Transfer facility available"
      ],
      bonus: "Free 3 Night Goa Stay with Cruise"
    },
    {
      id: 2,
      name: "Adventurer",
      tenure: "25 Years",
      nights: "7 Days / 6 Nights",
      originalPrice: "₹9,85,000",
      price: "₹7,85,000",
      discount: "20% OFF",
      popular: true,
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      features: [
        "Access to 800+ premium resorts",
        "All meals included (B/L/D)",
        "Premium room upgrades",
        "Concierge services",
        "Priority booking",
        "Exclusive member events",
        "Airport transfers included",
        "Spa & wellness credits"
      ],
      bonus: "Free 5 Night Dubai Stay + Cruise Package"
    },
    {
      id: 3,
      name: "Elite",
      tenure: "Lifetime",
      nights: "10 Days / 9 Nights",
      originalPrice: "₹15,00,000",
      price: "₹12,85,000",
      discount: "14% OFF",
      popular: false,
      icon: Gift,
      color: "from-gold-500 to-yellow-600",
      features: [
        "Access to 1000+ luxury resorts",
        "All-inclusive packages",
        "Suite upgrades guaranteed",
        "Personal travel concierge",
        "Unlimited bookings per year",
        "VIP airport lounge access",
        "Private transfers",
        "Exclusive dining experiences",
        "Annual bonus nights"
      ],
      bonus: "Free International Honeymoon Package"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Membership Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership plan that suits your travel dreams. 
            Enjoy exclusive benefits, premium accommodations, and unforgettable experiences.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto pt-16"
        >
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                  plan.popular ? 'ring-4 ring-purple-500 ring-opacity-50' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg whitespace-nowrap">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-r ${plan.color} text-white ${plan.popular ? 'pt-12 pb-8 px-8' : 'p-8'} text-center`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-lg opacity-90">{plan.tenure} Membership</p>
                </div>

                {/* Pricing */}
                <div className="p-8 text-center border-b border-gray-100">
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-lg">{plan.originalPrice}</span>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{plan.price}</div>
                    <div className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {plan.discount}
                    </div>
                  </div>
                  <p className="text-gray-600 font-medium">{plan.nights} per year</p>
                </div>

                {/* Features */}
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check size={12} className="text-green-600" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bonus */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                      <Gift size={16} className="text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">Special Bonus</span>
                    </div>
                    <p className="text-sm text-orange-600">{plan.bonus}</p>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/membership/checkout?plan=${plan.id}`}
                    className={`w-full bg-gradient-to-r ${plan.color} text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Section */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="text-blue-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Premium Quality</h4>
                <p className="text-sm text-gray-600">Hand-picked resorts and hotels with exceptional service standards</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="text-green-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Guaranteed Bookings</h4>
                <p className="text-sm text-gray-600">Assured availability with no blackout dates or hidden charges</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="text-purple-600" size={24} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">VIP Treatment</h4>
                <p className="text-sm text-gray-600">Exclusive member benefits and personalized travel experiences</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Compare All Plans
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Speak to Expert
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipPlans;
