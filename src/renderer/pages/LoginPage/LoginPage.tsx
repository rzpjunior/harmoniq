import React, { useState, useEffect } from 'react';
import { setAuthToken } from '../../../utils/axiosInstance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      navigate('/home');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.electron.env.API_BASE_URL}/user/login`, {
        email,
        password
      });
      console.log('Login successful:', response.data.data);
      setAuthToken(response.data.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(135deg, #001F33 29.09%, #330033 51.77%, #000000 129.35%)' }}>
      <div className="p-10 bg-black/75 shadow-xl rounded-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Log in to Harmoniq</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-white focus:border-2"
              style={{ background: 'black', color: 'white' }}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-white focus:border-2"
              style={{ background: 'black', color: 'white' }}
            />
          </div>
          <button type="submit" style={{ background: '#410041' }} className="w-full flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white hover:bg-opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform duration-150 ease-in-out">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;