'use client';

import React, { useState, useEffect } from 'react';
import { User, CreditCard, TrendingUp, Plus, Send, History, LogOut } from 'lucide-react';

export default function BankingApp() {
  // All state declarations
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');

  // API Base URL - adjust this to match your Spring Boot server
  const API_BASE = 'http://localhost:8081/api';

  // Ensure component only renders on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // API call utility
  const apiCall = async (endpoint, options = {}) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}${endpoint}`, {
        credentials: 'include',
        ...options
      });
      
      if (endpoint === '/history' || endpoint === '/user-info') {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('API Error:', error);
      return 'Network error occurred';
    } finally {
      setLoading(false);
    }
  };

  // Load current user info (balance and account number)
  const loadUserInfo = async () => {
    const userInfo = await apiCall('/user-info');
    if (userInfo && typeof userInfo === 'object') {
      setCurrentUser(userInfo);
      setUserBalance(userInfo.balance || 0);
    }
  };

  // Authentication functions
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', signupUsername);
    formData.append('password', signupPassword);
    
    const result = await apiCall('/signup', {
      method: 'POST',
      body: formData
    });
    
    setMessage(result);
    if (result.includes('successful') && result.includes('account number')) {
      setSignupUsername('');
      setSignupPassword('');
      setActiveTab('login');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', loginUsername);
    formData.append('password', loginPassword);
    
    const result = await apiCall('/login', {
      method: 'POST',
      body: formData
    });
    
    setMessage(result);
    if (result.includes('successful') || result.includes('Welcome')) {
      setIsLoggedIn(true);
      setActiveTab('dashboard');
      setLoginUsername('');
      setLoginPassword('');
      
      // Load user info after successful login
      await loadUserInfo();
      loadTransactionHistory();
    }
  };

  const handleLogout = async () => {
    const result = await apiCall('/logout', { method: 'POST' });
    setMessage(result);
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserBalance(0);
    setTransactions([]);
    setActiveTab('login');
  };

  // Transaction functions
  const handleDeposit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('amount', transactionAmount);
    
    const result = await apiCall('/deposit', {
      method: 'POST',
      body: formData
    });
    
    setMessage(result);
    setTransactionAmount('');
    if (result.includes('successfully') && result.includes('Balance:')) {
      const balanceMatch = result.match(/Balance:\s*([\d.]+)/);
      if (balanceMatch) {
        setUserBalance(parseFloat(balanceMatch[1]));
      }
      loadTransactionHistory();
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('amount', transactionAmount);
    
    const result = await apiCall('/withdraw', {
      method: 'POST',
      body: formData
    });
    
    setMessage(result);
    setTransactionAmount('');
    if (result.includes('successfully') && result.includes('Balance:')) {
      const balanceMatch = result.match(/Balance:\s*([\d.]+)/);
      if (balanceMatch) {
        setUserBalance(parseFloat(balanceMatch[1]));
      }
      loadTransactionHistory();
    }
  };

  const loadTransactionHistory = async () => {
    const history = await apiCall('/history');
    if (Array.isArray(history)) {
      setTransactions(history);
    }
  };

  // Show loading screen until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
      </div>
    );
  }

  // Login/Signup Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">SecureBank</h1>
              <p className="text-blue-200">Your trusted banking partner</p>
            </div>

            <div className="flex mb-6 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  activeTab === 'login' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  activeTab === 'signup' 
                    ? 'bg-white/20 text-white shadow-lg' 
                    : 'text-blue-200 hover:bg-white/10'
                }`}
              >
                Sign Up
              </button>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg text-sm ${
                message.includes('successful') || message.includes('Welcome') 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30'
              }`}>
                {message}
              </div>
            )}

            {activeTab === 'login' ? (
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/15"
                    required
                    autoComplete="username"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/15"
                    required
                    autoComplete="current-password"
                  />
                </div>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/15"
                    required
                    autoComplete="username"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 focus:bg-white/15"
                    required
                    autoComplete="new-password"
                  />
                </div>
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SecureBank</h1>
              <p className="text-sm text-gray-600">Welcome, {currentUser?.username}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation Tabs */}
        <nav className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'dashboard' 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'deposit' 
                ? 'bg-green-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Deposit</span>
          </button>
          <button
            onClick={() => setActiveTab('withdraw')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'withdraw' 
                ? 'bg-red-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Withdraw</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('history');
              loadTransactionHistory();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'history' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
        </nav>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('successful') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Account Balance Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Account Balance</h3>
                <CreditCard className="w-6 h-6" />
              </div>
              <p className="text-3xl font-bold mb-2">${userBalance.toFixed(2)}</p>
              <p className="text-blue-100">Available Balance</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Info</h3>
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-xl font-bold text-gray-900 mb-2">Welcome Back!</p>
              <p className="text-gray-600 mb-1">Username: {currentUser?.username}</p>
              <p className="text-gray-600">Account Number: {currentUser?.accountNumber || 'Loading...'}</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('deposit')}
                  className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  Make Deposit
                </button>
                <button
                  onClick={() => setActiveTab('withdraw')}
                  className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Make Withdrawal
                </button>
                <button
                  onClick={() => {
                    setActiveTab('history');
                    loadTransactionHistory();
                  }}
                  className="w-full py-2 px-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Make Deposit</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deposit Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={handleDeposit}
                  disabled={loading}
                  className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Processing...' : 'Deposit Funds'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Make Withdrawal</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Withdrawal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                <button
                  onClick={handleWithdraw}
                  disabled={loading}
                  className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Processing...' : 'Withdraw Funds'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No transactions found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'DEPOSIT' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'DEPOSIT' ? (
                            <Plus className={`w-5 h-5 text-green-600`} />
                          ) : (
                            <Send className={`w-5 h-5 text-red-600`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal'}
                          </p>
                          <p className="text-sm text-gray-600">
                            {transaction.description || `${transaction.type.toLowerCase()} transaction`}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.timestamp || transaction.date || 'Recent'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'DEPOSIT' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}