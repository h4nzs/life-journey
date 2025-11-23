import apiClient from './axios';

export const getEmosisByRintangan = async (rintanganId) => {
  const { data } = await apiClient.get(`/rintangan/${rintanganId}/emosi`);
  return data;
};

export const createEmosi = async ({ rintanganId, ...emosiData }) => {
  const { data } = await apiClient.post(`/rintangan/${rintanganId}/emosi`, emosiData);
  return data;
};

export const deleteEmosi = async (id) => {
  const { data } = await apiClient.delete(`/emosi/${id}`);
  return data;
};
