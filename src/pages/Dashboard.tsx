import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Sample Dashboard Data
const dashboardData = {
  totalRevenue: 127850,
  totalUsers: 1245,
  activeSubscriptions: 987,
  monthlyGrowth: 12.5,
  revenueData: [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 62000 },
    { name: 'Apr', revenue: 58000 },
    { name: 'May', revenue: 71000 },
  ],
  recentTransactions: [
    { 
      id: 1, 
      name: "John Doe", 
      amount: 499, 
      status: "Completed", 
      date: "2024-01-15" 
    },
    { 
      id: 2, 
      name: "Sarah Smith", 
      amount: 299, 
      status: "Pending", 
      date: "2024-01-20" 
    }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#00C8C8]">Dashboard</h1>
        <div className="flex space-x-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded ${
              activeTab === 'overview' 
                ? 'bg-[#00C8C8] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded ${
              activeTab === 'transactions' 
                ? 'bg-[#00C8C8] text-white' 
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Transactions
          </button>
        </div>
      </header>

      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-4 gap-6">
          {/* Key Metrics Cards */}
          <div className="bg-gray-100 rounded-lg p-6 flex items-center">
            <DollarSign className="text-[#00C8C8] mr-4" size={40} />
            <div>
              <h3 className="text-gray-500">Total Revenue</h3>
              <p className="text-2xl font-bold">${dashboardData.totalRevenue.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center">
            <Users className="text-[#00C8C8] mr-4" size={40} />
            <div>
              <h3 className="text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center">
            <CreditCard className="text-[#00C8C8] mr-4" size={40} />
            <div>
              <h3 className="text-gray-500">Active Subscriptions</h3>
              <p className="text-2xl font-bold">{dashboardData.activeSubscriptions}</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center">
            <TrendingUp className="text-green-500 mr-4" size={40} />
            <div>
              <h3 className="text-gray-500">Monthly Growth</h3>
              <p className="text-2xl font-bold text-green-500">
                {dashboardData.monthlyGrowth}%
              </p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="col-span-full bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.revenueData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#00C8C8" 
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Transaction ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentTransactions.map(transaction => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-3">{transaction.id}</td>
                  <td className="p-3">{transaction.name}</td>
                  <td className="p-3">${transaction.amount}</td>
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">
                    <span className={`
                      px-2 py-1 rounded-full text-sm
                      ${transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'}
                    `}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;