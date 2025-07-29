'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Users, MapPin, Calendar, Package, Award, Heart, Globe, Shield, Target, Eye } from 'lucide-react';
import { staticData } from '@/lib/staticApi';

// Icon mapping for dynamic icon rendering
const iconMap = {
  Users,
  MapPin,
  Calendar,
  Package,
  Award,
  Heart,
  Globe,
  Shield,
  Target,
  Eye
};

// Custom hook for timeline item animations
const useTimelineItemAnimation = (index) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
    rootMargin: '-10% 0px -10% 0px'
  });

  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    index % 2 === 0 ? [-150, 0, 0, 150] : [150, 0, 0, -150]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.7]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [10, 0, 0, -10]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { ref: itemRef, inView, springX, springY, opacity, springScale, rotate };
};

const AboutUsPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [achievementsRef, achievementsInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  // Timeline container scroll progress
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

// Timeline Item Component with Advanced Animations
const TimelineItem = ({ achievement, index }) => {
  const { ref, inView, springX, springY, opacity, springScale, rotate } = useTimelineItemAnimation(index);

  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -100 : 100,
      scale: 0.8,
      rotateY: isEven ? -15 : 15
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: isEven ? 100 : -100,
      scale: 0.8,
      rotateY: isEven ? 15 : -15,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, opacity, scale: springScale, rotate }}
      className={`flex items-center mb-16 relative ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content Card */}
      <motion.div
        className={`flex-1 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        exit="exit"
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              className="text-5xl mb-4"
              variants={iconVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {achievement.icon}
            </motion.div>

            <motion.div
              className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
              variants={textVariants}
              custom={0}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {achievement.year}
            </motion.div>

            <motion.h3
              className="text-xl font-bold text-gray-900 mb-3"
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {achievement.title}
            </motion.h3>

            <motion.p
              className="text-gray-600 leading-relaxed"
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {achievement.description}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline Dot */}
      <motion.div
        className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full relative z-20 shadow-lg"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
          animate={inView ? {
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Empty space for layout */}
      <div className="flex-1"></div>
    </motion.div>
  );
};

  const companyStats = staticData.getCompanyStats();

  const missionVision = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make extraordinary travel experiences accessible to everyone by providing exceptional service, competitive pricing, and unforgettable journeys that create lasting memories.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To become the most trusted and preferred travel partner globally, known for innovation, reliability, and creating transformative travel experiences.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const achievements = [
    {
      year: '2009',
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize travel experiences',
      icon: '🚀'
    },
    {
      year: '2012',
      title: 'First 1000 Customers',
      description: 'Reached our first major milestone of satisfied travelers',
      icon: '🎯'
    },
    {
      year: '2015',
      title: 'International Expansion',
      description: 'Expanded services to include global destinations',
      icon: '🌍'
    },
    {
      year: '2018',
      title: 'Membership Program Launch',
      description: 'Introduced exclusive membership benefits for frequent travelers',
      icon: '💎'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Launched comprehensive online booking platform',
      icon: '💻'
    },
    {
      year: '2024',
      title: '50,000+ Happy Travelers',
      description: 'Celebrating over 50,000 satisfied customers worldwide',
      icon: '🎉'
    }
  ];

  const whyChooseUs = [
    {
      icon: Heart,
      title: 'Passionate Team',
      description: 'Our travel experts are passionate about creating perfect experiences',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: '15+ years of reliable service with thousands of happy customers',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Extensive network of partners worldwide for seamless travel',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in travel services and customer satisfaction',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
          }}
        ></div>
        
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              World Across
            </span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-8">
            Your trusted travel partner for over 15 years, creating extraordinary journeys 
            and unforgettable memories across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200">
              Our Story
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {companyStats.map((stat, index) => {
              const IconComponent = iconMap[stat.icon] || Users;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" ref={missionRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driven by purpose and guided by vision, we strive to transform the way people experience travel
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {missionVision.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted travel partner for thousands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Our journey"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-gray-900">
                The Journey Begins
              </h3>
              <p className="text-gray-600 leading-relaxed">
                In 2009, our founder Arjun Mehta had a simple yet powerful vision: to make luxury travel 
                accessible to everyone. What started as a small travel agency with big dreams has grown 
                into a trusted partner for thousands of travelers worldwide.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our commitment to exceptional service, competitive pricing, and creating unforgettable 
                experiences has been the cornerstone of our success. Every journey we plan is crafted 
                with care, attention to detail, and a deep understanding of what makes travel truly special.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to have served over 50,000 travelers, but our mission remains the same: 
                to create extraordinary travel experiences that transform lives and create lasting memories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline - Advanced Scroll Animations */}
      <section className="py-20 relative overflow-hidden" ref={achievementsRef}>
        <div className="container mx-auto px-4">
          {/* Section Header with Parallax */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={achievementsInView ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20
              }
            } : {}}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={achievementsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Journey
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={achievementsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Key milestones that shaped our story and commitment to excellence
            </motion.p>
          </motion.div>

          {/* Timeline Container */}
          <div className="max-w-5xl mx-auto relative" ref={timelineRef}>
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full rounded-full">
              <motion.div
                className="w-full bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 origin-top rounded-full shadow-lg"
                style={{ height: timelineHeight }}
                transition={{ duration: 0.3 }}
              />
              {/* Progress Glow Effect */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-purple-600"
                style={{
                  top: timelineHeight,
                  transition: "top 0.3s ease-out"
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(147, 51, 234, 0.4)",
                    "0 0 0 10px rgba(147, 51, 234, 0)",
                    "0 0 0 0 rgba(147, 51, 234, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <TimelineItem
                  key={index}
                  achievement={achievement}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-4 h-4 rounded-full ${
                i % 3 === 0 ? 'bg-blue-300' : i % 3 === 1 ? 'bg-purple-300' : 'bg-pink-300'
              } opacity-30`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={achievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose World Across?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What sets us apart and makes us the preferred choice for travelers worldwide
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={achievementsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((reason, index) => {
              const IconComponent = reason.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${reason.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={achievementsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Create Your Story?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have discovered the world with World Across. 
              Your next adventure awaits!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Contact Our Experts
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
