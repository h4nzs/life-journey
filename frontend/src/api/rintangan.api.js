import apiClient from './axios';

export const getRintangansByPerjalanan = async (perjalananId) => {
  const { data } = await apiClient.get(`/perjalanan/${perjalananId}/rintangan`);
  return data;
};

export const createRintangan = async ({ perjalananId, ...rintanganData }) => {
  const { data } = await apiClient.post(`/perjalanan/${perjalananId}/rintangan`, rintanganData);
  return data;
};

export const updateRintangan = async ({ id, ...rintanganData }) => {
  const { data } = await apiClient.put(`/rintangan/${id}`, rintanganData);
  return data;
};

export const deleteRintangan = async (id) => {
  const { data } = await apiClient.delete(`/rintangan/${id}`);
  return data;
};
