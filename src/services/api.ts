import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
});

export const fetchProductsApi = async (limit: number, skip: number) => {
  const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const searchProductsApi = async (query: string) => {
  const response = await api.get(`/products/search?q=${query}`);
  return response.data;
};

export default api;
