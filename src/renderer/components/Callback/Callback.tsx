import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('spotifyToken');
    if (token) {
      console.log('Token:', token); // Log the token for debugging
      navigate('/login');
    } else {
      console.error('No token found in local storage');
    }
  }, [navigate]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default Callback;
