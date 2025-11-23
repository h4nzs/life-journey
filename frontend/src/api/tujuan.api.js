import apiClient from './axios';

export const getTujuans = async () => {
  const { data } = await apiClient.get('/tujuan');
  return data;
};

export const createTujuan = async (tujuanData) => {
  const { data } = await apiClient.post('/tujuan', tujuanData);
  return data;
};

export const updateTujuan = async (id, tujuanData) => {
  const { data } = await apiClient.put(`/tujuan/${id}`, tujuanData);
  return data;
};

export const deleteTujuan = async (id) => {
  const { data } = await apiClient.delete(`/tujuan/${id}`);
  return data;
};
