'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Plus,
  Minus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  DollarSign,
  PiggyBank,
  Gift,
  Award,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import { dashboardAPI } from '@/lib/staticApi';

const BalanceManagement = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addAmount, setAddAmount] = useState('');

  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response = await dashboardAPI.getBalanceData();
        setBalanceData(response.data.balance);
        setTransactions(response.data.transactions || []);
        setFilteredTransactions(response.data.transactions || []);
      } catch (error) {
        console.error('Error fetching balance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  useEffect(() => {
    let filtered = [...transactions];

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    // Period filter
    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterPeriod) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(transaction => 
        new Date(transaction.date) >= filterDate
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, filterType, filterPeriod]);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'debit':
        return <ArrowDownLeft className="h-5 w-5 text-red-500" />;
      case 'refund':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      case 'reward':
        return <Gift className="h-5 w-5 text-purple-500" />;
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case 'credit':
        return 'text-green-600';
      case 'debit':
        return 'text-red-600';
      case 'refund':
        return 'text-blue-600';
      case 'reward':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleAddFunds = () => {
    // In a real app, this would integrate with payment gateway
    console.log('Adding funds:', addAmount);
    setShowAddFunds(false);
    setAddAmount('');
    // Show success message
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const balance = balanceData || {
    current: 0,
    pending: 0,
    totalEarned: 0,
    totalSpent: 0,
    loyaltyPoints: 0,
    monthlySpending: []
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wallet & Balance</h2>
          <p className="text-gray-600 mt-1">Manage your funds and track spending</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => setShowAddFunds(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>Add Funds</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <Download size={16} />
            <span>Statement</span>
          </button>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Wallet className="h-6 w-6" />
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:text-gray-200"
            >
              {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div>
            <p className="text-sm text-blue-100 mb-1">Current Balance</p>
            <p className="text-3xl font-bold">
              {showBalance ? `₹${balance.current.toLocaleString()}` : '••••••'}
            </p>
          </div>
        </motion.div>

        {/* Pending Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
              Pending
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Balance</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{balance.pending.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Total Earned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
              +12%
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{balance.totalEarned.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Loyalty Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-700">
              Points
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Loyalty Points</p>
            <p className="text-2xl font-bold text-gray-900">
              {balance.loyaltyPoints.toLocaleString()}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setShowAddFunds(true)}
            className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <Plus className="h-8 w-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-700">Add Money</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <CreditCard className="h-8 w-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-700">Pay Bills</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Gift className="h-8 w-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-700">Redeem Points</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <PiggyBank className="h-8 w-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-700">Save Money</span>
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="credit">Credits</option>
                <option value="debit">Debits</option>
                <option value="refund">Refunds</option>
                <option value="reward">Rewards</option>
              </select>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-white rounded-lg">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.method}</span>
                        {transaction.orderId && (
                          <>
                            <span>•</span>
                            <span>Order: {transaction.orderId}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'credit' || transaction.type === 'refund' || transaction.type === 'reward' ? '+' : '-'}
                      ₹{transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Balance: ₹{transaction.balance.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-600">
                  {filterType !== 'all' || filterPeriod !== 'all' 
                    ? 'Try adjusting your filters to see more transactions.'
                    : 'Your transaction history will appear here.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add Funds</h3>
              <button
                onClick={() => setShowAddFunds(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Add
                </label>
                <input
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 2000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setAddAmount(amount.toString())}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  disabled={!addAmount || parseFloat(addAmount) <= 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Add Funds
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BalanceManagement;
