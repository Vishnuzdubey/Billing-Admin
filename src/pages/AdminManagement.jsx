import React, { useState } from 'react';
import { Shield, UserPlus, AlertCircle, Search, Clock, Filter, ChevronDown } from 'lucide-react';

// Sample data - replace with API calls in production
const initialAdmins = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "super_admin",
    status: "active",
    lastActive: "2024-01-30 14:23",
    permissions: ["all"],
    createdAt: "2023-06-15"
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "admin",
    status: "active",
    lastActive: "2024-01-29 16:45",
    permissions: ["users.view", "users.edit", "billing.view"],
    createdAt: "2023-08-20"
  },
  {
    id: 3,
    name: "Lisa Brown",
    email: "lisa@example.com",
    role: "moderator",
    status: "active",
    lastActive: "2024-01-30 09:15",
    permissions: ["users.view", "support.manage"],
    createdAt: "2023-12-01"
  }
];

const initialAuditLogs = [
  {
    id: 1,
    adminId: 1,
    adminName: "Sarah Wilson",
    action: "Updated user permissions",
    target: "Mike Johnson",
    details: "Modified billing permissions",
    timestamp: "2024-01-30 14:23"
  },
  {
    id: 2,
    adminId: 2,
    adminName: "Mike Johnson",
    action: "Reset user password",
    target: "User #1242",
    details: "Password reset initiated",
    timestamp: "2024-01-29 16:45"
  }
];

const ROLES = {
  super_admin: {
    label: "Admin",
    color: "bg-purple-100 text-purple-800"
  },
  admin: {
    label: "Admin",
    color: "bg-blue-100 text-blue-800"
  },
  moderator: {
    label: "Admin",
    color: "bg-green-100 text-green-800"
  }
};

const PERMISSIONS = {
  "users.view": "View Users",
  "users.edit": "Edit Users",
  "billing.view": "View Billing",
  "billing.edit": "Edit Billing",
  "support.manage": "Manage Support",
  "admins.manage": "Manage Admins",
  "all": "Full Access"
};

const AdminManagement = () => {
  const [admins, setAdmins] = useState(initialAdmins);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('admins'); // 'admins' or 'audit'

  // Filter admins based on search term and role filter
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleNewAdmin = () => {
    setSelectedAdmin(null);
    setShowAdminModal(true);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Management</h1>
        <p className="text-gray-600">Manage admin accounts, roles, and monitor activity</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-6">
          <button
            className={`pb-3 px-1 ${activeTab === 'admins' ? 
              'border-b-2 border-blue-600 text-blue-600' : 
              'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('admins')}
          >
            Admin List
          </button>
          <button
            className={`pb-3 px-1 ${activeTab === 'audit' ? 
              'border-b-2 border-blue-600 text-blue-600' : 
              'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('audit')}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {activeTab === 'admins' ? (
        <>
          {/* Admin List Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search admins..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <select
              className="border rounded-lg px-4 py-2"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>

            <button
              onClick={handleNewAdmin}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <UserPlus size={20} className="mr-2" />
              Add Admin
            </button>
          </div>

          {/* Admin List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAdmins.map(admin => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ROLES[admin.role].color}`}>
                        {ROLES[admin.role].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {admin.lastActive}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setShowAdminModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Audit Logs
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock size={20} />
              <span>Recent Activity</span>
            </div>
          </div>
          <div className="divide-y">
            {auditLogs.map(log => (
              <div key={log.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{log.adminName}</div>
                    <div className="text-sm text-gray-600">{log.action}</div>
                    <div className="text-sm text-gray-500">Target: {log.target}</div>
                    <div className="text-sm text-gray-500">{log.details}</div>
                  </div>
                  <div className="text-sm text-gray-500">{log.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admin Edit/Create Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedAdmin ? 'Edit Admin' : 'New Admin'}
              </h2>
              <button 
                onClick={() => setShowAdminModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={selectedAdmin?.name || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={selectedAdmin?.email || ''}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  defaultValue={selectedAdmin?.role || 'moderator'}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="space-y-2">
                  {Object.entries(PERMISSIONS).map(([key, label]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 mr-2"
                        defaultChecked={selectedAdmin?.permissions.includes(key)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAdminModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle save
                  setShowAdminModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

export default AdminManagement;