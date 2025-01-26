import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // make sure VITE_API_URL is in .env file
});

export const getUserData = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Other functions to call different routes (like booking, payment, etc.)
