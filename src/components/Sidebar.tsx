import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Store,
  FolderTree,
  UserCog,
  FileText,
  Settings,
  Shield,
  BarChart3,
  HelpCircle,
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/Dashboard' },
    { icon: Users, label: 'User Management', path: '/UserManagement' },
    // { icon: Store, label: ' Add News ', path: '/Addnews' },
    // { icon: UserCog, label: 'News Management', path: '/NewsManagement' },
    // { icon: FileText, label: 'Metal & Fule price', path: '/metalFulePrice' },
    // { icon: FolderTree, label: 'Advertisment Management', path: '/AdsManagement' },
    { icon: FolderTree, label: 'Admin Management', path: '/AdminManagement' },
    { icon: FolderTree, label: 'Store Management', path: '/StoreManagement' },
    { icon: FolderTree, label: 'Invoice', path: '/Invoice' },
    { icon: FolderTree, label: 'Payments Transactions Panel', path: '/PaymentsTransactionsPanel' },
    { icon: FolderTree, label: 'Subscription Analytics Panel', path: '/SubscriptionAnalyticsPanel' },
    { icon: FolderTree, label: 'Support', path: '/AuditSupportPanel' },
    // { icon: Shield, label: 'News Management', path: '/NewsManagement' },
    // { icon: BarChart3, label: 'Reports', path: '/reports' },
    // { icon: Settings, label: 'Settings', path: '/settings' },
    // { icon: HelpCircle, label: 'Support', path: '/support' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center p-6 border-b border-gray-200">
        <span className="text-2xl font-bold text-[#DD2B2B]">Billing Admin</span>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mb-1 rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#DD2B2B] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;