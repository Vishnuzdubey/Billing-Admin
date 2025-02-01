import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Addnews from './pages/Addnews';
import UserManagement from './pages/UserManagement';
import MetalFulePrice from './pages/metalFulePrice';
import NewsManagement from './pages/NewsManagement';
import AdsManagemnet from './pages/AdsManagement';

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
