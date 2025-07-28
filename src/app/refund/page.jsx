'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RefreshCw, Clock, CreditCard, AlertCircle, CheckCircle, Phone, Shield, Calendar } from 'lucide-react';

const RefundPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const refundTypes = [
    {
      icon: CheckCircle,
      title: 'Full Refund',
      description: 'Complete refund of amount paid',
      conditions: ['Cancellation within 24 hours of booking', 'Service provider cancellation', 'Force majeure events'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: RefreshCw,
      title: 'Partial Refund',
      description: 'Refund after deducting applicable charges',
      conditions: ['Cancellation after 24 hours', 'Change in travel plans', 'Voluntary cancellations'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: AlertCircle,
      title: 'No Refund',
      description: 'Non-refundable bookings',
      conditions: ['Special promotional rates', 'Last-minute bookings', 'No-show situations'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Credit Note',
      description: 'Future travel credit instead of cash refund',
      conditions: ['Flexible booking options', 'Membership benefits', 'Special circumstances'],
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const refundTimeline = [
    {
      time: '0-24 Hours',
      title: 'Free Cancellation',
      description: 'Full refund with no cancellation charges',
      icon: '✅',
      color: 'bg-green-100 text-green-800'
    },
    {
      time: '1-7 Days',
      title: 'Standard Cancellation',
      description: 'Refund minus 10% cancellation fee',
      icon: '⚠️',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      time: '7-30 Days',
      title: 'Late Cancellation',
      description: 'Refund minus 25% cancellation fee',
      icon: '🔶',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      time: '30+ Days',
      title: 'Very Late Cancellation',
      description: 'Refund minus 50% cancellation fee',
      icon: '🔴',
      color: 'bg-red-100 text-red-800'
    }
  ];

  const sections = [
    {
      id: 'general-policy',
      title: '1. General Refund Policy',
      icon: Shield,
      content: [
        'All refunds are subject to the terms and conditions of the respective service providers (airlines, hotels, etc.).',
        'Refund processing time varies from 7-21 business days depending on the payment method and service provider.',
        'Refunds will be processed to the original payment method used for booking.',
        'Service charges and convenience fees are non-refundable unless the cancellation is due to our error.',
        'Travel insurance claims should be processed directly with the insurance provider.'
      ]
    },
    {
      id: 'flight-refunds',
      title: '2. Flight Booking Refunds',
      icon: Calendar,
      content: [
        'Refund eligibility depends on the fare type and airline policy.',
        'Refundable tickets: Full refund minus airline cancellation charges.',
        'Non-refundable tickets: No refund, but may be eligible for credit with the airline.',
        'Flight cancellations by airline: Full refund including all taxes and fees.',
        'Schedule changes: Passengers may request full refund if new schedule is unacceptable.'
      ]
    },
    {
      id: 'hotel-refunds',
      title: '3. Hotel Booking Refunds',
      icon: Clock,
      content: [
        'Free cancellation available for most bookings up to 24-48 hours before check-in.',
        'Non-refundable rates: No refund available, but may allow date changes with fees.',
        'Hotel-initiated cancellations: Full refund plus compensation if applicable.',
        'Early checkout: No refund for unused nights unless due to hotel issues.',
        'Group bookings may have different cancellation terms.'
      ]
    },
    {
      id: 'package-refunds',
      title: '4. Package Tour Refunds',
      icon: RefreshCw,
      content: [
        'Package cancellations are subject to combined policies of all service providers.',
        'Cancellation charges increase as departure date approaches.',
        'Individual components cannot be cancelled separately from package deals.',
        'Force majeure events may allow full refund or rescheduling options.',
        'Travel insurance is highly recommended for package bookings.'
      ]
    },
    {
      id: 'membership-refunds',
      title: '5. Membership Refunds',
      icon: CreditCard,
      content: [
        'Membership fees are generally non-refundable after the cooling-off period.',
        '7-day cooling-off period: Full refund if cancelled within 7 days of purchase.',
        'Unused membership benefits do not qualify for partial refunds.',
        'Membership transfers to family members may be allowed in special circumstances.',
        'Lifetime memberships are non-refundable but may be transferred.'
      ]
    },
    {
      id: 'refund-process',
      title: '6. Refund Process',
      icon: CheckCircle,
      content: [
        'Submit cancellation request through our website or customer service.',
        'Provide booking reference number and reason for cancellation.',
        'Refund eligibility will be assessed based on booking terms and service provider policies.',
        'Approved refunds will be processed within 7-21 business days.',
        'You will receive email confirmation once refund is processed.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <RefreshCw size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding our refund policy helps you make informed decisions about your travel bookings. 
            We strive to be fair and transparent in all our refund processes.
          </p>
          <div className="mt-6 p-4 bg-green-100 rounded-xl">
            <p className="text-sm text-green-800">
              <strong>Last Updated:</strong> January 1, 2024
            </p>
          </div>
        </motion.div>

        {/* Refund Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Types of Refunds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {refundTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    {type.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Refund Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cancellation Timeline</h2>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {refundTimeline.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${item.color}`}>
                    {item.time}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
              >
                <section.icon size={16} className="mr-3" />
                <span className="text-sm font-medium">{section.title}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Policy Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                id={section.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact for Refunds */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Phone size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Need Help with Refunds?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help you with refund requests and answer any questions 
            about our refund policy. Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Support
            </a>
            <a
              href="mailto:refunds@worldacross.com"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              Email Refund Team
            </a>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <div className="flex items-start">
            <AlertCircle size={24} className="text-blue-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-blue-800 mb-2">Important Refund Information</h3>
              <p className="text-blue-700 text-sm leading-relaxed mb-3">
                Refund policies may vary based on service providers, booking type, and special circumstances. 
                We recommend purchasing travel insurance to protect against unforeseen events. 
                Always review the specific terms and conditions of your booking before confirming.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-medium">Travel Insurance Recommended</span>
                <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-medium">Terms May Vary</span>
                <span className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded-full font-medium">Read Before Booking</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="/terms" className="hover:text-green-600 transition-colors duration-200">
              Terms & Conditions
            </a>
            <a href="/privacy" className="hover:text-green-600 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/contact" className="hover:text-green-600 transition-colors duration-200">
              Contact Us
            </a>
            <a href="/about-us" className="hover:text-green-600 transition-colors duration-200">
              About Us
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            © 2024 World Across. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPage;
