import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1. Interceptor de solicitud: adjunta el token JWT en Authorization: Bearer <token>
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cy_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. Interceptor de respuesta: maneja expiración 401 limpiando sesión y notificando con calidez
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('cy_token');
      localStorage.removeItem('cy_usuario');
      window.dispatchEvent(new CustomEvent('cy:session-expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
