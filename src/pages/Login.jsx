import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Lock, 
  LogIn, 
  Shield, 
  Newspaper, 
  UserCheck 
} from 'lucide-react';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Function to get device ID
    const getDeviceId = async () => {
      try {
        // This is a simplified example - you should implement proper device ID generation
        // You might want to use a library like 'device-uuid' or other methods
        const id = navigator.userAgent + navigator.platform + screen.width + screen.height;
        const hashedId = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(id))
          .then(buffer => Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join(''));
        setDeviceId(hashedId);
      } catch (error) {
        console.error('Error generating device ID:', error);
        setDeviceId('default-device-id');
      }
    };

    getDeviceId();
  }, []);

  const roles = [
    { 
      name: 'Admin', 
      icon: Shield, 
      description: 'Full system access and control',
      endpoint: 'http://localhost:5000/api/v1/admin/login',
      defaultCreds: { username: 'jarvis', password: '1234' },
      tokenKey: 'admin'
    },
    { 
      name: 'Sub Admin', 
      icon: UserCheck, 
      description: 'Limited administrative privileges',
      endpoint: 'http://localhost:5000/api/v1/user/login',
      defaultCreds: { username: 'shaanu', password: '1234' },
      tokenKey: 'subadmin'
    },
    { 
      name: 'Staff', 
      icon: Newspaper, 
      description: 'Manage store inventory and sales',
      endpoint: 'http://localhost:5000/api/v1/store/login',
      // defaultCreds: { username: 'shubham', password: '1234' },
      tokenKey: 'staff'
    }
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const selectedRoleData = roles.find(role => role.name === selectedRole);
    if (!selectedRoleData) {
      setError('Please select a role');
      setIsLoading(false);
      return;
    }

    try {
      const requestBody = {
        username,
        password,
        ...(selectedRole === 'Staff' && { deviceId })
      };

      const response = await axios.post(selectedRoleData.endpoint, requestBody);

      if (response.data && response.data.token) {
        // Store the token in localStorage with the appropriate key
        localStorage.setItem(selectedRoleData.tokenKey, response.data.token);
        
        // Navigate to dashboard
        navigate('/Dashboard');
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-80 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Login Header */}
        <div className="bg-red-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">Billing Buddy Login</h1>
          <p className="text-red-100 mt-2">Select your role and enter credentials</p>
        </div>

        {/* Role Selection */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between space-x-2">
            {roles.map((role) => (
              <button
                key={role.name}
                onClick={() => {
                  setSelectedRole(role.name);
                  setUsername(role.defaultCreds.username);
                  setPassword(role.defaultCreds.password);
                }}
                className={`flex-1 flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedRole === role.name 
                    ? 'bg-red-100 border-red-600 shadow-md' 
                    : 'bg-gray-50 border-transparent hover:bg-red-50'
                }`}
              >
                <role.icon 
                  className={`mb-2 ${
                    selectedRole === role.name 
                      ? 'text-red-600' 
                      : 'text-gray-400'
                  }`} 
                  size={32} 
                />
                <span className={`font-medium ${
                  selectedRole === role.name 
                    ? 'text-red-800' 
                    : 'text-gray-600'
                }`}>
                  {role.name}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {role.description}
                </p>
              </button>
            ))}
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
                <Lock size={20} />
              </div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-red-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
              >
                {isPasswordVisible ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedRole || isLoading}
              className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
                selectedRole && !isLoading
                  ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  <>
                    <LogIn className="mr-2" size={20} />
                    Login
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <a 
              href="#" 
              className="text-red-600 hover:underline text-sm"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-red-300/20 rounded-full animate-blob"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Login;