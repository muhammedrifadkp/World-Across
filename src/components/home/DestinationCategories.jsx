'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mountain, Waves, Building2, Heart, TreePine, Compass } from 'lucide-react';
import Link from 'next/link';

const DestinationCategories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    {
      id: 1,
      name: "Adventure",
      icon: Mountain,
      description: "Thrilling experiences in nature's playground",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "45+ Destinations",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 2,
      name: "Beach",
      icon: Waves,
      description: "Sun, sand, and crystal-clear waters",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "32+ Destinations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Heritage",
      icon: Building2,
      description: "Explore rich culture and history",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "28+ Destinations",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Honeymoon",
      icon: Heart,
      description: "Romantic getaways for couples",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "25+ Destinations",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 5,
      name: "Wildlife",
      icon: TreePine,
      description: "Connect with nature and wildlife",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "18+ Destinations",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 6,
      name: "Pilgrimage",
      icon: Compass,
      description: "Spiritual journeys and sacred places",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      count: "22+ Destinations",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
            Destinations for Every Theme
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you seek adventure, relaxation, culture, or romance, we have the perfect 
            destination waiting for you. Explore our curated collection of themed travel experiences.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/destinations/category/${category.name.toLowerCase()}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Background Image */}
                    <div className="relative h-64">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
                      
                      {/* Content Overlay */}
                      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                          className="mb-4"
                        >
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <IconComponent size={32} />
                          </div>
                        </motion.div>

                        {/* Category Name */}
                        <h3 className="text-2xl font-bold mb-2 text-center">
                          {category.name}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-center mb-3 opacity-90">
                          {category.description}
                        </p>

                        {/* Count */}
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1">
                          <span className="text-sm font-semibold">
                            {category.count}
                          </span>
                        </div>

                        {/* Hover Arrow */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 right-4"
                        >
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find Your Perfect Theme?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our travel experts can create a customized itinerary based on your preferences. 
              Let us help you discover your dream destination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/destinations"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Explore All Destinations
              </Link>
              <Link
                href="/contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Get Custom Itinerary
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationCategories;
