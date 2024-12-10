import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Bearer token for all requests
apiClient.interceptors.request.use(
  (config) => {
    // Check if the request URL is NOT 'api/auth/signup' or 'api/auth/signin'
    if (
      !config.url?.includes('/api/auth/signup') &&
      !config.url?.includes('/api/auth/signin')
    ) {
      const token = localStorage.getItem('authTokenZip');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Add Bearer token to request headers
      }
    }
    return config; // Return the modified request config
  },
  (error) => {
    return Promise.reject(error); // Handle any request errors
  },
);

export default apiClient;
