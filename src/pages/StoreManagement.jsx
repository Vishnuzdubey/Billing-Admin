import React, { useState } from 'react';
import { Store, Search, Filter, UserPlus, Settings, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Sample data - replace with API calls in production
const initialStores = [
  {
    id: 1,
    name: "Tech Solutions Inc",
    owner: {
      id: 1,
      name: "John Smith",
      email: "john@techsolutions.com"
    },
    status: "active",
    plan: "enterprise",
    userLimit: 50,
    currentUsers: 42,
    monthlyRevenue: 12500,
    created: "2023-06-15",
    lastActive: "2024-01-30",
    linkedUsers: [
      { id: 1, name: "John Smith", role: "owner" },
      { id: 2, name: "Sarah Jones", role: "admin" },
      { id: 3, name: "Mike Wilson", role: "user" }
    ],
    billingHistory: [
      { id: 1, date: "2024-01-01", amount: 999, status: "paid" },
      { id: 2, date: "2023-12-01", amount: 999, status: "paid" }
    ]
  },
  {
    id: 2,
    name: "Digital Marketing Pro",
    owner: {
      id: 2,
      name: "Lisa Brown",
      email: "lisa@digmarketing.com"
    },
    status: "pending",
    plan: "professional",
    userLimit: 25,
    currentUsers: 18,
    monthlyRevenue: 5600,
    created: "2024-01-15",
    lastActive: "2024-01-29",
    linkedUsers: [
      { id: 4, name: "Lisa Brown", role: "owner" },
      { id: 5, name: "Tom Davis", role: "user" }
    ],
    billingHistory: [
      { id: 3, date: "2024-01-15", amount: 499, status: "paid" }
    ]
  }
];

const PLANS = {
  enterprise: {
    label: "Enterprise",
    color: "bg-purple-100 text-purple-800"
  },
  professional: {
    label: "Professional",
    color: "bg-blue-100 text-blue-800"
  },
  starter: {
    label: "Starter",
    color: "bg-green-100 text-green-800"
  }
};

const STATUS = {
  active: {
    label: "Active",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle
  },
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
    icon: AlertCircle
  },
  inactive: {
    label: "Inactive",
    color: "bg-red-100 text-red-800",
    icon: XCircle
  }
};

const StoreManagement = () => {
  const [stores, setStores] = useState(initialStores);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    plan: 'all'
  });

  // Filter stores based on search and filters
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || store.status === filters.status;
    const matchesPlan = filters.plan === 'all' || store.plan === filters.plan;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleStoreAction = (storeId, action) => {
    setStores(stores.map(store => {
      if (store.id === storeId) {
        switch (action) {
          case 'approve':
            return { ...store, status: 'active' };
          case 'disable':
            return { ...store, status: 'inactive' };
          default:
            return store;
        }
      }
      return store;
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Store Management</h1>
        <p className="text-gray-600">Manage business accounts, subscriptions, and user access</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stores or owners..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <select
          className="border rounded-lg px-4 py-2"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          className="border rounded-lg px-4 py-2"
          value={filters.plan}
          onChange={(e) => setFilters({ ...filters, plan: e.target.value })}
        >
          <option value="all">All Plans</option>
          <option value="enterprise">Enterprise</option>
          <option value="professional">Professional</option>
          <option value="starter">Starter</option>
        </select>

        <button
          onClick={() => {
            setSelectedStore(null);
            setShowStoreModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Store size={20} className="mr-2" />
          Add Store
        </button>
      </div>

      {/* Store List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStores.map(store => {
              const StatusIcon = STATUS[store.status].icon;
              return (
                <tr key={store.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{store.name}</div>
                    <div className="text-sm text-gray-500">Created {store.created}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium">{store.owner.name}</div>
                      <div className="text-gray-500">{store.owner.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${STATUS[store.status].color}`}>
                      <StatusIcon size={14} className="mr-1" />
                      {STATUS[store.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${PLANS[store.plan].color}`}>
                      {PLANS[store.plan].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {store.currentUsers}/{store.userLimit}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          setSelectedStore(store);
                          setShowStoreModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                      {store.status === 'pending' && (
                        <button
                          onClick={() => handleStoreAction(store.id, 'approve')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                      )}
                      {store.status === 'active' && (
                        <button
                          onClick={() => handleStoreAction(store.id, 'disable')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Disable
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Store Details Modal */}
      {showStoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {selectedStore ? selectedStore.name : 'New Store'}
              </h2>
              <button 
                onClick={() => setShowStoreModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Store Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Store Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        defaultValue={selectedStore?.name || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subscription Plan
                      </label>
                      <select
                        className="w-full px-3 py-2 border rounded-lg"
                        defaultValue={selectedStore?.plan || 'starter'}
                      >
                        <option value="enterprise">Enterprise</option>
                        <option value="professional">Professional</option>
                        <option value="starter">Starter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Limit
                      </label>
                      <input
                        type="number"
                        className="w-full px-3 py-2 border rounded-lg"
                        defaultValue={selectedStore?.userLimit || 10}
                      />
                    </div>
                  </div>
                </div>

                {/* Billing History */}
                {selectedStore && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {selectedStore.billingHistory.map(bill => (
                            <tr key={bill.id}>
                              <td className="px-4 py-2 text-sm">{bill.date}</td>
                              <td className="px-4 py-2 text-sm">${bill.amount}</td>
                              <td className="px-4 py-2 text-sm">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  bill.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {bill.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Linked Users */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Linked Users</h3>
                  {selectedStore && (
                    <div className="border rounded-lg divide-y">
                      {selectedStore.linkedUsers.map(user => (
                        <div key={user.id} className="p-4 flex justify-between items-center">
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div
                            className="text-sm text-gray-500">{user.role}</div>
                                          </div>
                                          <button className="text-red-600 hover:text-red-900">
                                          Remove
                                          </button>
                                        </div>
                                        ))}
                                      </div>
                                      )}
                                    </div>
                                    </div>
                                  </div>

                                  <div className="mt-6 flex justify-end">
                                    <button
                                    onClick={() => setShowStoreModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                    >
                                    Close
                                    </button>
                                    <button
                                    onClick={() => {
                                      // Save store details logic here
                                      setShowStoreModal(false);
                                    }}
                                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                    Save
                                    </button>
                                  </div>
                                  </div>
                                </div>
                                )}
                              </div>
                              );
                            };

                            export default StoreManagement;