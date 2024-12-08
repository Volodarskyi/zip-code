import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
