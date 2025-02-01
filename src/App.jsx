import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Addnews from './pages/Addnews';
import UserManagement from './pages/UserManagement';
import MetalFulePrice from './pages/SubscriptionAnalyticsPanel.jsx';
import NewsManagement from './pages/NewsManagement';
import AdsManagemnet from './pages/AdsManagement';
import AdminManagement from './pages/AdminManagement.jsx';
import StoreManagement from './pages/StoreManagement.jsx';
import Invoice from './pages/Invoice.jsx';
import PaymentsTransactionsPanel from './pages/PaymentTransactionPanel.jsx';
import SubscriptionAnalyticsPanel from './pages/SubscriptionAnalyticsPanel.jsx';
import AuditSupportPanel from './pages/AuditSupportPanel.jsx';
import SettingsConfigurationPanel from './pages/SettingConfigurationPanel.jsx';


function App() {
  const location = useLocation(); // Get the current route

  const isLoginPage = location.pathname === '/'; // Check if the current page is Login

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Sidebar />} {/* Sidebar is hidden on the login page */}
      <div className={!isLoginPage ? 'ml-64' : ''}>
        {!isLoginPage && <Header />} {/* Header is hidden on the login page */}
        <main className={isLoginPage ? '' : 'pt-16'}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Addnews" element={<Addnews />} />
            <Route path="/NewsManagement" element={<NewsManagement/>}/>
            <Route path="/UserManagement" element={<UserManagement/>}/>
            <Route path="/metalFulePrice" element={<MetalFulePrice/>}/>
            <Route path="/AdsManagement" element={<AdsManagemnet/>}/>
            <Route path="/AdminManagement" element={<AdminManagement/>}/>
            <Route path="/StoreManagement" element={<StoreManagement/>}/>
            <Route path="/Invoice" element={<Invoice />} />
            <Route path="/PaymentsTransactionsPanel" element={<PaymentsTransactionsPanel/>} />
            <Route path="/SubscriptionAnalyticsPanel" element={<SubscriptionAnalyticsPanel/>} />
            <Route path="/AuditSupportPanel" element={<AuditSupportPanel/>} />
            <Route path="/SettingsConfigurationPanel" element={<SettingsConfigurationPanel/>} />
            {/* Add other routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
