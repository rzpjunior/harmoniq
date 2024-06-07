import axios from 'axios';

const http = axios.create({
  baseURL: window.electron.env.API_BASE_URL
});

// Function to set the token
export const setAuthToken = (token: string | null) => {
  if (token) {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token); 
  } else {
    delete http.defaults.headers.common['Authorization'];
    localStorage.removeItem('token'); 
  }
};

export default http;