'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  DollarSign, 
  Smile, 
  Shield, 
  Heart, 
  Plane, 
  CheckCircle, 
  Headphones,
  Award
} from 'lucide-react';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      id: 1,
      icon: MapPin,
      title: "MORE CHOICES",
      description: "Access to 1000+ destinations worldwide with diverse accommodation options",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: DollarSign,
      title: "LOW COST",
      description: "Best price guarantee with exclusive member discounts and no hidden fees",
      color: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: Smile,
      title: "MORE ENJOYMENT",
      description: "Curated experiences and activities to make your vacation truly memorable",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 4,
      icon: Shield,
      title: "MORE FREEDOM",
      description: "Flexible booking options with easy cancellation and modification policies",
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 5,
      icon: Heart,
      title: "GOOD MEMORIES",
      description: "Creating unforgettable moments with personalized service and attention to detail",
      color: "from-pink-500 to-red-500"
    },
    {
      id: 6,
      icon: Plane,
      title: "AMAZING FLIGHT DISCOUNTS",
      description: "Exclusive airline partnerships offering significant savings on domestic and international flights",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 7,
      icon: CheckCircle,
      title: "ASSURED BOOKING",
      description: "Guaranteed reservations with instant confirmation and no blackout dates",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 8,
      icon: Headphones,
      title: "VISA ASSISTANCE",
      description: "Complete visa support and documentation assistance for international travel",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 9,
      icon: Award,
      title: "VALUE FOR MONEY",
      description: "Premium experiences at competitive prices with transparent pricing and no surprises",
      color: "from-emerald-500 to-green-600"
    }
  ];

  const stats = [
    {
      number: "1000+",
      label: "Hotels & Resort Options Across The World",
      description: "Carefully selected properties ensuring quality and comfort"
    },
    {
      number: "50K+",
      label: "Happy Travelers",
      description: "Satisfied customers who trust us with their dream vacations"
    },
    {
      number: "15+",
      label: "Years of Excellence",
      description: "Proven track record in delivering exceptional travel experiences"
    },
    {
      number: "24/7",
      label: "Customer Support",
      description: "Round-the-clock assistance for all your travel needs"
    }
  ];

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what makes World Across the preferred choice for travelers worldwide. 
            We're committed to delivering exceptional value and unforgettable experiences.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              We Have Over
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">
                  {stat.number}
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  {stat.label}
                </h4>
                <p className="text-sm text-blue-100 opacity-90">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have made World Across their trusted travel partner. 
              Start your journey with us today and discover why we're the preferred choice for memorable vacations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Start Your Journey
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
