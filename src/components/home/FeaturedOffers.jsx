'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, MapPin, Clock, Users, ArrowRight, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedOffers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Modern travel packages with fresh data
  const travelPackages = [
    {
      id: 1,
      title: "SUMMER ESCAPE",
      subtitle: "Beach Paradise",
      location: "Goa, India",
      image: "/offers/SUMMER-ESCAPE.jpeg",
      originalPrice: "₹15,000",
      discountedPrice: "₹9,999",
      discount: "33% OFF",
      duration: "4 Days / 3 Nights",
      guests: "2 Adults",
      rating: 4.8,
      reviews: 124,
      features: ["Beach Resort", "All Meals", "Airport Transfer", "Water Sports"],
      badge: "BESTSELLER",
      badgeColor: "from-orange-500 to-red-500",
      description: "Relax on pristine beaches with luxury amenities"
    },
    {
      id: 2,
      title: "LUXURY HOLIDAY",
      subtitle: "Premium Experience",
      location: "Kerala, India",
      image: "/offers/LUXURY-HOLIDAY.jpeg",
      originalPrice: "₹25,000",
      discountedPrice: "₹18,999",
      discount: "24% OFF",
      duration: "5 Days / 4 Nights",
      guests: "2 Adults",
      rating: 4.9,
      reviews: 89,
      features: ["Houseboat", "Ayurveda Spa", "Backwater Cruise", "Cultural Tour"],
      badge: "PREMIUM",
      badgeColor: "from-purple-500 to-pink-500",
      description: "Indulge in luxury with traditional Kerala charm"
    },
    {
      id: 3,
      title: "FAMILY FUN",
      subtitle: "Adventure Awaits",
      location: "Rajasthan, India",
      image: "/offers/FAMILY-FUN.jpg",
      originalPrice: "₹20,000",
      discountedPrice: "₹14,999",
      discount: "25% OFF",
      duration: "6 Days / 5 Nights",
      guests: "4 People",
      rating: 4.7,
      reviews: 156,
      features: ["Heritage Hotels", "Desert Safari", "Cultural Shows", "Local Cuisine"],
      badge: "FAMILY SPECIAL",
      badgeColor: "from-green-500 to-teal-500",
      description: "Create unforgettable memories with your loved ones"
    },
    {
      id: 4,
      title: "ROMANTIC GETAWAY",
      subtitle: "Love in the Mountains",
      location: "Himachal Pradesh, India",
      image: "/offers/ROMANTIC-GETAWAY.jpg",
      originalPrice: "₹18,000",
      discountedPrice: "₹12,999",
      discount: "28% OFF",
      duration: "4 Days / 3 Nights",
      guests: "2 Adults",
      rating: 4.8,
      reviews: 92,
      features: ["Mountain Resort", "Candlelight Dinner", "Couple Spa", "Adventure Activities"],
      badge: "ROMANTIC",
      badgeColor: "from-pink-500 to-rose-500",
      description: "Escape to romantic mountain retreats"
    }
  ];

  // Modern animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };



  const badgeVariants = {
    initial: { scale: 0, rotate: -10 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.3
      }
    }
  };



  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Limited Time Offers
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
            Exclusive Offers
            <br />
            <span className="text-4xl md:text-6xl">This Month</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover breathtaking destinations with our curated travel experiences.
            Each package is crafted to deliver exceptional value and create memories that last a lifetime.
          </p>
        </motion.div>

        {/* Modern Offers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {travelPackages.map((offer) => (
            <motion.div
              key={offer.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-64">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  width={400}
                  height={256}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  priority={offer.id <= 2}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Badge */}
                <motion.div
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  className="absolute top-4 left-4"
                >
                  <span className={`bg-gradient-to-r ${offer.badgeColor} text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg`}>
                    {offer.badge}
                  </span>
                </motion.div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    {offer.discount}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-sm font-bold text-gray-900">{offer.rating}</span>
                  <span className="text-xs text-gray-600">({offer.reviews})</span>
                </div>

                {/* Heart Icon */}
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors group/heart">
                  <Heart className="w-5 h-5 text-gray-600 group-hover/heart:text-red-500 transition-colors" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Title and Subtitle */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{offer.title}</h3>
                  <p className="text-sm text-blue-600 font-semibold">{offer.subtitle}</p>
                </div>

                {/* Location */}
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={18} className="mr-2 text-blue-500" />
                  <span className="font-medium">{offer.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{offer.description}</p>

                {/* Duration and Guests */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2 text-blue-500" />
                      <span className="text-sm font-medium">{offer.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2 text-blue-500" />
                      <span className="text-sm font-medium">{offer.guests}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {offer.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through text-lg">{offer.originalPrice}</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {offer.discountedPrice}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">per person</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/packages/${offer.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Book Now</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            <span>View All Packages</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
