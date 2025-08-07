'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  Wallet, 
  User, 
  LogOut,
  X,
  Home
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DashboardSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Dashboard summary'
    },
    {
      id: 'purchases',
      label: 'Purchase History',
      icon: ShoppingBag,
      description: 'Your bookings & orders'
    },
    {
      id: 'services',
      label: 'Availed Services',
      icon: MapPin,
      description: 'Services you\'ve used'
    },
    {
      id: 'balance',
      label: 'Wallet & Balance',
      icon: Wallet,
      description: 'Manage your funds'
    },
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: User,
      description: 'Account settings'
    }
  ];

  const handleLogout = async () => {
    await logout();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:bg-white lg:border-r lg:border-gray-200">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/wa-only-logo-without-bg.png"
                alt="World Across Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">World Across</h2>
                <p className="text-xs text-gray-500">Customer Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="px-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1 h-6 bg-blue-500 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 space-y-2">
            <Link
              href="/"
              className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
            >
              <Home className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Image
                src="/wa-only-logo-without-bg.png"
                alt="World Across Logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content - Same as desktop */}
          <div className="flex flex-col flex-grow pt-4 pb-4 overflow-y-auto">
            {/* User Profile Card */}
            <div className="px-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsSidebarOpen(false)}
                className="w-full group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
              >
                <Home className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Back to Website
              </Link>
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-red-500" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;