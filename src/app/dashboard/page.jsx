'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  CreditCard,
  MapPin,
  Calendar,
  Wallet,
  TrendingUp,
  Package,
  Star,
  Eye,
  Download,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import ClientOnly from '@/components/ClientOnly';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import UserDashboard from '@/components/dashboard/UserDashboard';
import AvailedServices from '@/components/dashboard/AvailedServices';
import BalanceManagement from '@/components/dashboard/BalanceManagement';
import ProfileSettings from '@/components/dashboard/ProfileSettings';

const DashboardPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle URL parameters for direct navigation
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'purchases', 'services', 'balance', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'purchases':
        return <UserDashboard />;
      case 'services':
        return <AvailedServices />;
      case 'balance':
        return <BalanceManagement />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <ClientOnly>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile sidebar overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <DashboardSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200 z-10">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <button
                      onClick={() => setIsSidebarOpen(true)}
                      className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    <div className="ml-4 lg:ml-0">
                      <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back, {user?.firstName}!
                      </h1>
                      <p className="text-sm text-gray-500">
                        Manage your travel experiences and account
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-blue-700 font-medium">Active Member</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-4 sm:p-6 lg:p-8">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveComponent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default DashboardPage;