import apiClient from './axios';

export const getPerjalanansByTujuan = async (tujuanId) => {
  const { data } = await apiClient.get(`/tujuan/${tujuanId}/perjalanan`);
  return data;
};

export const createPerjalanan = async ({ tujuanId, ...perjalananData }) => {
  const { data } = await apiClient.post(`/tujuan/${tujuanId}/perjalanan`, perjalananData);
  return data;
};

export const updatePerjalanan = async ({ id, ...perjalananData }) => {
  const { data } = await apiClient.put(`/perjalanan/${id}`, perjalananData);
  return data;
};

export const deletePerjalanan = async (id) => {
  const { data } = await apiClient.delete(`/perjalanan/${id}`);
  return data;
};
