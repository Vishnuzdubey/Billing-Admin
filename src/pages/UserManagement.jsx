import React, { useState } from 'react';
import { Bell, User, Phone, MapPin, Edit, PlusCircle, Save, X } from 'lucide-react';

const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    branch: "Downtown Branch",
    dueDate: "2024-09-15",
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Smith",
    branch: "Uptown Branch", 
    dueDate: "2024-02-01",
    status: "expired"
  }
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [newOutlet, setNewOutlet] = useState({
    name: '',
    branch: '',
    dueDate: ''
  });
  const [showAddOutletModal, setShowAddOutletModal] = useState(false);

  const calculateValidity = (dueDate) => {
    return Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const handleEditUser = (user) => {
    setEditingUser({...user});
  };

  const saveUserEdit = () => {
    setUsers(users.map(u => 
      u.id === editingUser.id ? editingUser : u
    ));
    setEditingUser(null);
  };

  const handleAddOutlet = () => {
    const newUser = {
      id: users.length + 1,
      ...newOutlet,
      status: calculateValidity(newOutlet.dueDate) > 0 ? 'active' : 'expired'
    };
    
    setUsers([...users, newUser]);
    setShowAddOutletModal(false);
    setNewOutlet({ name: '', branch: '', dueDate: '' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <User className="text-[#00C8C8]" size={40} />
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
        </div>
        <Bell className="text-[#00C8C8]" size={24} />
      </header>

      {/* User List Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => {
          const validity = calculateValidity(user.dueDate);
          const isActive = validity > 0;

          if (editingUser && editingUser.id === user.id) {
            return (
              <div key={user.id} className="bg-gray-100 rounded-lg p-6 shadow-lg">
                <input 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Name"
                />
                <input 
                  value={editingUser.branch}
                  onChange={(e) => setEditingUser({...editingUser, branch: e.target.value})}
                  className="w-full mb-2 p-2 border rounded"
                  placeholder="Branch"
                />
                <input 
                  type="date"
                  value={editingUser.dueDate}
                  onChange={(e) => setEditingUser({...editingUser, dueDate: e.target.value})}
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={saveUserEdit}
                    className="bg-[#00C8C8] text-white px-4 py-2 rounded flex items-center"
                  >
                    <Save size={18} className="mr-2" /> Save
                  </button>
                  <button 
                    onClick={() => setEditingUser(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                  >
                    <X size={18} className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div 
              key={user.id} 
              className="bg-gray-100 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <div 
                className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                  isActive ? 'bg-green-500' : 'bg-red-500'
                }`}
              />

              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <div className="text-gray-600 space-y-1">
                <p>Branch: {user.branch}</p>
                <p>
                  Due Date: 
                  <span 
                    className={`ml-2 ${
                      isActive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {Math.abs(validity)} days {isActive ? 'remaining' : 'expired'}
                  </span>
                </p>
              </div>

              <button 
                onClick={() => handleEditUser(user)}
                className="absolute bottom-4 right-4 text-[#00C8C8] hover:opacity-80"
              >
                <Edit size={24} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Outlet Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => setShowAddOutletModal(true)}
          className="bg-[#00C8C8] text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition-colors flex items-center space-x-2"
        >
          <PlusCircle size={24} />
          <span>Add Outlet</span>
        </button>
      </div>

      {/* Add Outlet Modal */}
      {showAddOutletModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Outlet</h2>
            <input 
              value={newOutlet.name}
              onChange={(e) => setNewOutlet({...newOutlet, name: e.target.value})}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
            />
            <input 
              value={newOutlet.branch}
              onChange={(e) => setNewOutlet({...newOutlet, branch: e.target.value})}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Branch"
            />
            <input 
              type="date"
              value={newOutlet.dueDate}
              onChange={(e) => setNewOutlet({...newOutlet, dueDate: e.target.value})}
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-between mt-4">
              <button 
                onClick={handleAddOutlet}
                className="bg-[#00C8C8] text-white px-4 py-2 rounded"
              >
                Add Outlet
              </button>
              <button 
                onClick={() => setShowAddOutletModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;