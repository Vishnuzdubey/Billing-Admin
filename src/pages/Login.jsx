import { useNavigate } from 'react-router-dom'; 
import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  LogIn, 
  Shield, 
  Newspaper, 
  UserCheck 
} from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const roles = [
    { 
      name: 'Admin', 
      icon: Shield, 
      description: 'Full system access and control' 
    },
    { 
      name: 'Sub Admin', 
      icon: UserCheck, 
      description: 'Limited administrative privileges' 
    },
    { 
      name: 'Reporter', 
      icon: Newspaper, 
      description: 'Content creation and editing' 
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Attempt:', { username, password, role: selectedRole });
    // Add your authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-80 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Login Header */}
        <div className="bg-red-600 text-white p-6 text-center">
          <h1 className="text-3xl font-bold">Bedhadak News Portal Login</h1>
          <p className="text-red-100 mt-2">Select your role and enter credentials</p>
        </div>

        {/* Role Selection */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between space-x-2">
            {roles.map((role) => (
              <button
                key={role.name}
                onClick={() => setSelectedRole(role.name)}
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
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {/* Submit Button */}
            <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={() => selectedRole && navigate('/DashBoard')}
                  className={`w-full py-3 rounded-lg text-white font-bold transition-all duration-300 ${
                    selectedRole
                      ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
>                 
                  <div className="flex items-center justify-center">
                    <LogIn className="mr-2" size={20} />
                    Login
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