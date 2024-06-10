import React, { useState } from 'react';
import { setAuthToken } from '../../../utils/axiosInstance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.electron.env.API_BASE_URL}/auth/login`, {
        username,
        password
      });
      console.log('Login successful:', response.data);
      setAuthToken(response.data.token);  // Set the token in axiosInstance
      navigate('/home'); // Navigate to /home on successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
    setUsername('');
    setPassword('');
  };


  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(135deg, #001F33 29.09%, #330033 51.77%, #000000 129.35%)' }}>
      <div className="p-10 bg-black/75 shadow-xl rounded-xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Log in to Harmoniq</h2>
        <div className="flex flex-col space-y-4 mb-8">
        <button className="bg-black text-white border border-gray-500 rounded-full py-2 px-4 hover:border-white">Continue with Google</button>
          <button className="bg-black text-white border border-gray-500 rounded-full py-2 px-4 hover:border-white">Continue with Facebook</button>
          <button className="bg-black text-white border border-gray-500 rounded-full py-2 px-4 hover:border-white">Continue with phone number</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white">Email or username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
