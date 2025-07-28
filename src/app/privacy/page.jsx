'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Eye, Lock, Database, UserCheck, Globe, Mail, AlertTriangle } from 'lucide-react';

const PrivacyPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      icon: Database,
      content: [
        'Personal Information: Name, email address, phone number, date of birth, passport details, and payment information.',
        'Travel Preferences: Destination preferences, travel dates, accommodation preferences, and special requirements.',
        'Usage Data: Information about how you use our website, including IP address, browser type, pages visited, and time spent.',
        'Communication Data: Records of communications between you and our customer service team.',
        'Location Data: With your consent, we may collect location data to provide location-based services.'
      ]
    },
    {
      id: 'information-use',
      title: '2. How We Use Your Information',
      icon: UserCheck,
      content: [
        'To process and manage your travel bookings and reservations.',
        'To provide customer support and respond to your inquiries.',
        'To send you booking confirmations, travel updates, and important notifications.',
        'To personalize your experience and recommend relevant travel options.',
        'To process payments and prevent fraudulent transactions.',
        'To comply with legal obligations and regulatory requirements.',
        'To improve our services and develop new features.'
      ]
    },
    {
      id: 'information-sharing',
      title: '3. Information Sharing and Disclosure',
      icon: Globe,
      content: [
        'Service Providers: We share necessary information with airlines, hotels, and other travel service providers to complete your bookings.',
        'Payment Processors: Payment information is shared with secure payment processors to handle transactions.',
        'Legal Requirements: We may disclose information when required by law or to protect our rights and safety.',
        'Business Partners: With your consent, we may share information with trusted partners for promotional purposes.',
        'We do not sell your personal information to third parties for marketing purposes.'
      ]
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      icon: Lock,
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All sensitive data is encrypted during transmission and storage.',
        'Access to personal information is restricted to authorized personnel only.',
        'We regularly update our security practices and conduct security audits.',
        'Payment information is processed through PCI DSS compliant systems.',
        'We maintain backup systems to ensure data availability and integrity.'
      ]
    },
    {
      id: 'data-retention',
      title: '5. Data Retention',
      icon: Eye,
      content: [
        'We retain personal information for as long as necessary to provide our services.',
        'Booking and transaction records are kept for 7 years for legal and tax purposes.',
        'Marketing communications data is retained until you unsubscribe.',
        'Account information is retained while your account is active.',
        'You can request deletion of your data subject to legal requirements.'
      ]
    },
    {
      id: 'your-rights',
      title: '6. Your Privacy Rights',
      icon: Shield,
      content: [
        'Access: You have the right to access your personal information we hold.',
        'Correction: You can request correction of inaccurate or incomplete information.',
        'Deletion: You can request deletion of your personal information in certain circumstances.',
        'Portability: You can request a copy of your data in a portable format.',
        'Objection: You can object to processing of your information for marketing purposes.',
        'Withdrawal: You can withdraw consent for data processing at any time.'
      ]
    },
    {
      id: 'cookies',
      title: '7. Cookies and Tracking',
      icon: Eye,
      content: [
        'We use cookies to enhance your browsing experience and remember your preferences.',
        'Essential cookies are necessary for website functionality and cannot be disabled.',
        'Analytics cookies help us understand how visitors use our website.',
        'Marketing cookies are used to show relevant advertisements.',
        'You can control cookie settings through your browser preferences.',
        'Third-party services may also place cookies on your device.'
      ]
    },
    {
      id: 'updates',
      title: '8. Policy Updates',
      icon: AlertTriangle,
      content: [
        'We may update this privacy policy from time to time to reflect changes in our practices.',
        'Significant changes will be communicated via email or website notification.',
        'The effective date of the current policy is displayed at the top of this page.',
        'Continued use of our services after policy updates constitutes acceptance.',
        'We encourage you to review this policy periodically.'
      ]
    }
  ];

  const dataTypes = [
    {
      icon: UserCheck,
      title: 'Personal Data',
      description: 'Name, contact details, identification documents',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Lock,
      title: 'Financial Data',
      description: 'Payment information, billing addresses, transaction history',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Travel Data',
      description: 'Booking history, preferences, travel documents',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Eye,
      title: 'Usage Data',
      description: 'Website interactions, device information, cookies',
      color: 'from-orange-500 to-red-500'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information when you use World Across services.
          </p>
          <div className="mt-6 p-4 bg-blue-100 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Last Updated:</strong> January 1, 2024
            </p>
          </div>
        </motion.div>

        {/* Data Types Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Types of Data We Handle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-12"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <section.icon size={16} className="mr-3" />
                <span className="text-sm font-medium">{section.title}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Privacy Sections */}
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
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
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

        {/* Contact for Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Mail size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Privacy Questions or Concerns?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your personal information, 
            our Data Protection Officer is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="mailto:privacy@worldacross.com"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Email Privacy Team
            </a>
          </div>
        </motion.div>

        {/* Your Rights Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-green-50 border border-green-200 rounded-2xl p-6"
        >
          <div className="flex items-start">
            <UserCheck size={24} className="text-green-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-2">Your Data Rights</h3>
              <p className="text-green-700 text-sm leading-relaxed mb-3">
                You have control over your personal data. You can access, correct, delete, or transfer your information at any time. 
                Contact our privacy team to exercise these rights or if you have any concerns about how we handle your data.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Access</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Correct</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Delete</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Transfer</span>
                <span className="px-3 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">Object</span>
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
            <a href="/terms" className="hover:text-blue-600 transition-colors duration-200">
              Terms & Conditions
            </a>
            <a href="/refund" className="hover:text-blue-600 transition-colors duration-200">
              Refund Policy
            </a>
            <a href="/contact" className="hover:text-blue-600 transition-colors duration-200">
              Contact Us
            </a>
            <a href="/about-us" className="hover:text-blue-600 transition-colors duration-200">
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

export default PrivacyPage;
