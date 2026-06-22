import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-shecanDark px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] p-8 rounded-xl border border-gray-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Portal</h2>
        {error && <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-3 rounded mb-6 text-center text-sm">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input 
              type="text" 
              required
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed"
              placeholder="Enter admin username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed"
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="w-full bg-shecanRed hover:bg-red-700 text-white font-bold py-4 rounded transition-colors mt-4">
            Login to Dashboard
          </button>
        </form>
        <div className="text-center mt-6">
           <a href="/" className="text-sm text-gray-500 hover:text-white transition-colors">← Back to Main Site</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
