'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Users, MapPin, Calendar, Package, Award, Heart, Globe, Shield } from 'lucide-react';
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
  Shield
};

// Custom hook for timeline item animations
const useTimelineItemAnimation = (index) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
  });

  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    index % 2 === 0 ? [-100, 0, 0, 100] : [100, 0, 0, -100]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [5, 0, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [30, 0, 0, -30]);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return { ref: itemRef, inView, springX, springY, opacity, springScale, rotate };
};

// Timeline Item Component with Advanced Animations
const TimelineItem = ({ milestone, index }) => {
  const { ref, inView, springX, springY, opacity, springScale, rotate } = useTimelineItemAnimation(index);

  const isEven = index % 2 === 0;

  // Ensure content is always visible
  const [contentRef, contentInView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const cardVariants = {
    hidden: {
      opacity: 1,
      x: isEven ? -50 : 50,
      scale: 0.95,
      rotateY: isEven ? -5 : 5
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
      opacity: 1,
      x: isEven ? 50 : -50,
      scale: 0.95,
      rotateY: isEven ? 5 : -5,
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        scale: springScale,
        rotate
      }}
      animate={{
        opacity: 1
      }}
      transition={{ duration: 0.3 }}
      className={`flex items-center mb-16 relative ${
        isEven ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Content Card */}
      <motion.div
        ref={contentRef}
        className={`flex-1 ${isEven ? 'text-right pr-8' : 'text-left pl-8'}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden border border-gray-100"
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {milestone.year}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {milestone.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {milestone.description}
            </p>
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

const AboutPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [storyRef, storyInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Timeline container scroll progress
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const timelineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  const teamMembers = staticData.getTeamMembers();
  const companyStats = staticData.getCompanyStats();

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and creates lasting memories. Our passion drives us to craft exceptional experiences.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and satisfaction are our top priorities. We ensure every journey is secure and worry-free.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'With years of experience and worldwide connections, we bring you the best destinations and experiences.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every detail, from planning to execution, ensuring your trip exceeds expectations.',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const milestones = [
    { year: '2009', title: 'Founded', description: 'World Across was born with a vision to make luxury travel accessible' },
    { year: '2012', title: 'First 1000 Travelers', description: 'Reached our first milestone of serving 1000 happy travelers' },
    { year: '2015', title: 'International Expansion', description: 'Expanded to offer international destinations and packages' },
    { year: '2018', title: 'Membership Program', description: 'Launched our exclusive membership program for frequent travelers' },
    { year: '2020', title: 'Digital Innovation', description: 'Embraced digital transformation for seamless booking experiences' },
    { year: '2024', title: '50,000+ Travelers', description: 'Celebrating over 50,000 satisfied travelers and counting' }
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
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-purple-600/80"></div>
        
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              World Across
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Crafting extraordinary travel experiences for over 15 years. 
            Your journey to discover the world starts here.
          </p>
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

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            ref={storyRef}
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Founded in 2009 with a simple belief: everyone deserves to experience the world's wonders. 
              What started as a small travel agency has grown into a trusted partner for thousands of travelers, 
              creating memories that last a lifetime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Our team planning"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                From Dream to Reality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our journey began when our founder, Arjun Mehta, realized that luxury travel 
                shouldn't be exclusive to the few. With a vision to democratize premium travel 
                experiences, World Across was born.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we're proud to have served over 50,000 travelers, offering everything 
                from romantic getaways to family adventures, all while maintaining our commitment 
                to exceptional service and unforgettable experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Advanced Scroll Animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header - Fixed Position */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Our Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Milestones that shaped our story and commitment to excellence
            </p>
          </div>

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
              {milestones.map((milestone, index) => (
                <TimelineItem
                  key={index}
                  milestone={milestone}
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

      {/* Values Section */}
      <section className="py-20" ref={valuesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50" ref={teamRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind your extraordinary travel experiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied travelers who have discovered the world with World Across
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200">
                Explore Packages
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
