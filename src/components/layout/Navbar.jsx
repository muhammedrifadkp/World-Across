'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin, ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ClientOnly from '@/components/ClientOnly';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'Destinations',
      href: '/destinations',
      dropdown: [
        { name: 'Domestic Destinations', href: '/destinations/domestic' },
        { name: 'International Destinations', href: '/destinations/international' }
      ]
    },
    { name: 'Packages', href: '/packages' },
    { name: 'Membership', href: '/membership' },
    {
      name: 'About',
      href: '/about',
      dropdown: [
        { name: 'About Us', href: '/about' },
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Refund Policy', href: '/refund' }
      ]
    },
    { name: 'Contact', href: '/contact' }
  ];

  // Function to check if nav item is active
  const isActiveNavItem = (item) => {
    if (item.href === '/' && pathname === '/') return true;
    if (item.href !== '/' && pathname.startsWith(item.href)) return true;
    if (item.dropdown) {
      return item.dropdown.some(dropdownItem => pathname === dropdownItem.href);
    }
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={14} />
              <span>+91 9876543210 (Toll Free)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={14} />
              <span>info@worldacross.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={14} />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              {/* Logo Icon */}
              <div className="relative">
                <Image
                  src="/wa-only-logo-without-bg.png"
                  alt="World Across Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  priority
                />
              </div>
              {/* Logo Text and Tagline */}
              <div className="hidden sm:block">
                <div className="relative mb-1">
                  <Image
                    src="/world-across-name-without-bg.png"
                    alt="World Across"
                    width={140}
                    height={32}
                    className="h-6 w-auto object-contain"
                    priority
                  />
                </div>
                <p className="text-xs text-gray-500">Your Gateway to Adventure</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1 transition-colors duration-200 font-medium relative ${
                      isActiveNavItem(item)
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.dropdown && <ChevronDown size={16} />}
                    {/* Active indicator */}
                    {isActiveNavItem(item) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className={`block px-4 py-2 transition-colors duration-200 ${
                              pathname === dropdownItem.href
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                          >
                            {dropdownItem.name}
                            {pathname === dropdownItem.href && (
                              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full inline-block"></span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <ClientOnly fallback={
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/membership"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Join Now
                  </Link>
                </div>
              }>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                          <p className="text-xs text-gray-500">{user?.membership?.type} {user?.membership?.level}</p>
                        </div>
                        <ChevronDown size={16} />
                      </button>

                    <AnimatePresence>
                      {activeDropdown === 'user' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-3"
                        >
                          {/* User Info Header */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                <User size={24} className="text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                                <p className="text-sm text-gray-600">{user?.email}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                    {user?.membership?.type} {user?.membership?.level}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Quick Stats */}
                          <div className="px-4 py-3 border-b border-gray-100">
                            <div className="grid grid-cols-3 gap-3 text-center">
                              <div>
                                <p className="text-lg font-bold text-blue-600">₹{user?.account?.balance?.toLocaleString() || '0'}</p>
                                <p className="text-xs text-gray-500">Balance</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-green-600">{user?.recentActivity?.totalTrips || '0'}</p>
                                <p className="text-xs text-gray-500">Trips</p>
                              </div>
                              <div>
                                <p className="text-lg font-bold text-purple-600">{user?.membership?.loyaltyPoints || '0'}</p>
                                <p className="text-xs text-gray-500">Points</p>
                              </div>
                            </div>
                          </div>

                          {/* Navigation Links */}
                          <div className="py-2">
                            <Link
                              href="/user"
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              🏠 My Dashboard
                            </Link>
                            <Link
                              href="/dashboard?tab=purchases"
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              ✈️ My Bookings
                            </Link>
                            <Link
                              href="/dashboard?tab=balance"
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              💰 Wallet & Balance
                            </Link>
                            <Link
                              href="/dashboard?tab=services"
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              🎯 My Services
                            </Link>
                            <Link
                              href="/dashboard?tab=profile"
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                            >
                              👤 Profile Settings
                            </Link>
                          </div>

                          <hr className="my-2" />

                          <button
                            onClick={() => {
                              logout();
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/membership"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Join Now
                  </Link>
                </>
              )}
              </ClientOnly>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block transition-colors duration-200 font-medium py-2 flex items-center justify-between ${
                        isActiveNavItem(item)
                          ? 'text-blue-600 bg-blue-50 px-3 rounded-lg'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{item.name}</span>
                      {isActiveNavItem(item) && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className={`block text-sm transition-colors duration-200 py-1 flex items-center justify-between ${
                              pathname === dropdownItem.href
                                ? 'text-blue-600 bg-blue-50 px-3 rounded-lg font-medium'
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <span>{dropdownItem.name}</span>
                            {pathname === dropdownItem.href && (
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <Link
                    href="/login"
                    className="block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/membership"
                    className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-center font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
