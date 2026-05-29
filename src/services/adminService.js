import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api/admin' });

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getStats = () => API.get('/stats');
export const getUsers = () => API.get('/users');
export const toggleUserStatus = (id) => API.put(`/users/${id}/status`);
export const assignRole = (id, roleId) => API.put(`/users/${id}/role`, { roleId });
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const exportUsers = () => API.get('/export/users', { responseType: 'blob' });

export const getProducts = () => API.get('/products');
export const createProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const exportProducts = () => API.get('/export/products', { responseType: 'blob' });