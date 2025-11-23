import apiClient from './axios';

export const registerUser = async (userData) => {
  const { data } = await apiClient.post('/auth/register', userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await apiClient.post('/auth/login', userData);
  return data;
};
