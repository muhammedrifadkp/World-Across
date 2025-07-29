'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { packageAPI } from '@/lib/staticApi';

const FeaturedOffers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageAPI.getAll({ limit: 4, featured: true });
        if (response.data && response.data.packages) {
          setPackages(response.data.packages);
        } else {
          setPackages(fallbackOffers);
        }
      } catch (error) {
        console.log('Using fallback data for packages');
        setPackages(fallbackOffers);
      } finally {
        setLoading(false);
      }
    };

    // Use fallback data immediately in demo mode to prevent API calls
    if (process.env.NODE_ENV === 'development') {
      setPackages(fallbackOffers);
      setLoading(false);
    } else {
      fetchPackages();
    }
  }, []);

  const fallbackOffers = [
    {
      id: 1,
      title: "SUMMER ESCAPE",
      location: "Goa, India",
      image: "https://cabinsinsweden.com/images/fff22139-0eff-4852-9d57-795791d937cb/coolcation%20in%20sweden.jpg?preset=mainslider",
      originalPrice: "₹15,000",
      discountedPrice: "₹9,999",
      discount: "33% OFF",
      duration: "4 Days / 3 Nights",
      guests: "2 Adults",
      rating: 4.8,
      reviews: 124,
      features: ["Beach Resort", "All Meals", "Airport Transfer", "Activities"],
      badge: "BESTSELLER"
    },
    {
      id: 2,
      title: "LUXURY HOLIDAY",
      location: "Kerala, India",
      image: "https://blog.sothebysrealty.co.uk/hubfs/best%20luxury%20holiday%20destinations-webp.webp",
      originalPrice: "₹25,000",
      discountedPrice: "₹18,999",
      discount: "24% OFF",
      duration: "5 Days / 4 Nights",
      guests: "2 Adults",
      rating: 4.9,
      reviews: 89,
      features: ["Houseboat", "Ayurveda Spa", "Backwater Cruise", "Cultural Tour"],
      badge: "PREMIUM"
    },
    {
      id: 3,
      title: "FAMILY FUN",
      location: "Rajasthan, India",
      image: "https://plus.unsplash.com/premium_photo-1664356873951-6a056a304c54?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFtaWx5JTIwZnVufGVufDB8fDB8fHww",
      originalPrice: "₹20,000",
      discountedPrice: "₹14,999",
      discount: "25% OFF",
      duration: "6 Days / 5 Nights",
      guests: "4 People",
      rating: 4.7,
      reviews: 156,
      features: ["Heritage Hotels", "Desert Safari", "Cultural Shows", "Local Cuisine"],
      badge: "FAMILY SPECIAL"
    },
    {
      id: 4,
      title: "ROMANTIC GETAWAY",
      location: "Himachal Pradesh, India",
      image: "https://assets.insuremytrip.com/wp-content/uploads/2024/04/05182330/how_to_help_clients_plan_romantic_getaway.jpg",
      originalPrice: "₹18,000",
      discountedPrice: "₹12,999",
      discount: "28% OFF",
      duration: "4 Days / 3 Nights",
      guests: "2 Adults",
      rating: 4.8,
      reviews: 92,
      features: ["Mountain Resort", "Candlelight Dinner", "Couple Spa", "Adventure Activities"],
      badge: "ROMANTIC"
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
    hidden: { opacity: 0, y: 50 },
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
    <section className="py-20 bg-gray-50">
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
            Exclusive Offers This Month
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore stunning destinations with World Across. Enjoy our handpicked holiday packages 
            designed to provide exceptional value and unforgettable experiences.
          </p>
        </motion.div>

        {/* Offers Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {(packages.length > 0 ? packages : fallbackOffers).map((offer) => (
            <motion.div
              key={offer.id}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={offer.id <= 2}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={(e) => {
                    console.log('Image failed to load:', offer.image);
                    e.target.src = '/placeholder-image.svg';
                  }}
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {offer.badge}
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {offer.discount}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-current" size={14} />
                  <span className="text-sm font-semibold">
                    {typeof offer.rating === 'object' ? offer.rating.average : offer.rating}
                  </span>
                  <span className="text-xs text-gray-600">
                    ({typeof offer.rating === 'object' ? offer.rating.count : offer.reviews || '0'})
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{offer.location}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>
                      {typeof offer.duration === 'object'
                        ? `${offer.duration.days}D/${offer.duration.nights}N`
                        : offer.duration
                      }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{offer.guests}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {offer.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {offer.features.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{offer.features.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-400 line-through text-sm">{offer.originalPrice}</span>
                    <span className="text-2xl font-bold text-blue-600 ml-2">{offer.discountedPrice}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/packages/${offer.id}`}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Book Now</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/packages"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <span>View All Packages</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedOffers;
