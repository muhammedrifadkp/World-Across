'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Nazir Khan and Family",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80&crop=face",
      rating: 5,
      text: "We had an amazing experience with World Across. They made our trip seamless and unforgettable. The resort was exactly as promised, and the service was exceptional. Our family vacation to Goa was perfect in every way. Highly recommended!",
      package: "Goa Family Package",
      date: "December 2023"
    },
    {
      id: 2,
      name: "Md. Kabir",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80&crop=face",
      rating: 5,
      text: "World Across exceeded our expectations. Their attention to detail and customer service are exceptional. The Kerala houseboat experience was magical, and everything was arranged perfectly. We'll definitely book with them again!",
      package: "Kerala Backwaters",
      date: "November 2023"
    },
    {
      id: 3,
      name: "Sabir Khan and Family",
      location: "Kolkata, India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80&crop=face",
      rating: 5,
      text: "The team at World Across made our vacation truly memorable. Their expertise and friendly service made all the difference. The Rajasthan heritage tour was incredible, and our kids loved every moment of it.",
      package: "Rajasthan Heritage Tour",
      date: "October 2023"
    },
    {
      id: 4,
      name: "Sonu Preet",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80&crop=face",
      rating: 5,
      text: "Thank you, World Across, for making our travel experience smooth and enjoyable. The Dubai package was fantastic, and the hotel was luxurious. We look forward to traveling with you again!",
      package: "Dubai Luxury Package",
      date: "September 2023"
    },
    {
      id: 5,
      name: "Priya Sharma",
      location: "Chennai, India",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80&crop=face",
      rating: 5,
      text: "Our honeymoon in Himachal Pradesh was absolutely perfect thanks to World Across. Every detail was taken care of, from the romantic resort to the candlelight dinners. It was truly a dream come true!",
      package: "Himachal Honeymoon",
      date: "August 2023"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
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
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover why thousands of travelers trust World Across for their dream vacations. 
            Read testimonials from our satisfied customers who have experienced the magic of travel with us.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Quote size={32} className="text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-8 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                />
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentTestimonial].location}
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4 mt-2 text-sm text-gray-500">
                    <span>{testimonials[currentTestimonial].package}</span>
                    <span>•</span>
                    <span>{testimonials[currentTestimonial].date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Customer Photos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            See Our Happy Customers
          </h3>
          <div className="flex justify-center space-x-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'border-blue-600 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Success Story?
            </h4>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied travelers and experience the World Across difference. 
              Your dream vacation is just a click away!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Book Your Trip
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                Read More Reviews
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
