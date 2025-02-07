import React from 'react';
import { Bell, Mail, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

  const navigate = useNavigate();

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-200 focus:outline-none focus:border-[#DD2B2B]"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Mail className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-3 ml-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#DD2B2B] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </button>
            <button
              className="p-4 bg-[#DD2B2B] flex items-center justify-center"
              onClick={async () => {
              localStorage.removeItem('admin');
              localStorage.removeItem('subadmin');
              navigate('/login');
              console.log('Logged out');
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;