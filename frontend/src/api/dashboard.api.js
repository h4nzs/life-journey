import apiClient from './axios';

export const getDashboardStats = async () => {
  const { data } = await apiClient.get('/dashboard/stats');
  return data;
};
