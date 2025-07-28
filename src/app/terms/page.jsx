'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Shield, AlertCircle, CheckCircle, Clock, Phone } from 'lucide-react';

const TermsPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing and using World Across services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.'
      ]
    },
    {
      id: 'services',
      title: '2. Services Description',
      icon: FileText,
      content: [
        'World Across provides travel booking services including but not limited to flight bookings, hotel reservations, tour packages, and travel insurance.',
        'We act as an intermediary between you and travel service providers.',
        'All bookings are subject to availability and confirmation from respective service providers.',
        'Membership plans provide access to exclusive deals and benefits as described in the membership terms.'
      ]
    },
    {
      id: 'booking',
      title: '3. Booking and Payment Terms',
      icon: Shield,
      content: [
        'All bookings must be made by individuals 18 years or older.',
        'Payment must be made in full at the time of booking unless otherwise specified.',
        'Prices are subject to change without notice until booking is confirmed.',
        'Additional charges may apply for special requests, changes, or cancellations.',
        'All payments are processed securely through our payment partners.'
      ]
    },
    {
      id: 'cancellation',
      title: '4. Cancellation and Refund Policy',
      icon: Clock,
      content: [
        'Cancellation policies vary by service provider and booking type.',
        'Refunds are processed according to the specific terms of each booking.',
        'Cancellation fees may apply as per the terms of individual service providers.',
        'Travel insurance is recommended to protect against unforeseen circumstances.',
        'Refund processing time may vary from 7-21 business days depending on payment method.'
      ]
    },
    {
      id: 'liability',
      title: '5. Limitation of Liability',
      icon: AlertCircle,
      content: [
        'World Across acts as an agent for travel service providers and is not liable for their services.',
        'We are not responsible for delays, cancellations, or changes made by airlines, hotels, or other service providers.',
        'Travel insurance is strongly recommended to cover unforeseen circumstances.',
        'Our liability is limited to the amount paid for our services.',
        'We are not responsible for personal injury, property damage, or other losses during travel.'
      ]
    },
    {
      id: 'privacy',
      title: '6. Privacy and Data Protection',
      icon: Shield,
      content: [
        'We collect and use personal information as described in our Privacy Policy.',
        'Your data is protected using industry-standard security measures.',
        'We may share necessary information with service providers to complete your bookings.',
        'You have the right to access, update, or delete your personal information.',
        'We do not sell your personal information to third parties.'
      ]
    },
    {
      id: 'membership',
      title: '7. Membership Terms',
      icon: CheckCircle,
      content: [
        'Membership benefits are valid for the duration specified in your membership plan.',
        'Membership fees are non-refundable except as required by law.',
        'Benefits may be modified with 30 days notice to members.',
        'Membership is non-transferable and for personal use only.',
        'Unused benefits do not carry over to subsequent years unless specified.'
      ]
    },
    {
      id: 'modifications',
      title: '8. Modifications to Terms',
      icon: FileText,
      content: [
        'We reserve the right to modify these terms at any time.',
        'Changes will be posted on our website with the effective date.',
        'Continued use of our services constitutes acceptance of modified terms.',
        'Significant changes will be communicated via email to registered users.',
        'You are responsible for reviewing terms periodically.'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 py-20">
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
            <FileText size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services. 
            These terms govern your use of World Across services.
          </p>
          <div className="mt-6 p-4 bg-blue-100 rounded-xl">
            <p className="text-sm text-blue-800">
              <strong>Last Updated:</strong> January 1, 2024
            </p>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Terms Sections */}
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

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Phone size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            If you have any questions about these Terms & Conditions, please don't hesitate to contact us. 
            Our team is here to help clarify any concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="mailto:legal@worldacross.com"
              className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Email Legal Team
            </a>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
        >
          <div className="flex items-start">
            <AlertCircle size={24} className="text-yellow-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Important Notice</h3>
              <p className="text-yellow-700 text-sm leading-relaxed">
                These terms and conditions constitute a legally binding agreement between you and World Across. 
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                If you do not agree with any part of these terms, please discontinue use of our services immediately.
              </p>
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
            <a href="/privacy" className="hover:text-blue-600 transition-colors duration-200">
              Privacy Policy
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

export default TermsPage;
