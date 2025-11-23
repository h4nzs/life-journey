import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Create a new Tujuan for a TokohUtama.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @param {object} data - The data for the new Tujuan (jenis_tujuan, hasil).
 * @returns {Promise<object>} The created Tujuan.
 */
export const createTujuan = async (tokohId, data) => {
  const tujuan = await prisma.tujuan.create({
    data: {
      ...data,
      tokohId,
    },
  });
  return tujuan;
};

/**
 * Get all Tujuans for a TokohUtama.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @returns {Promise<array>} A list of Tujuans.
 */
export const getTujuans = async (tokohId) => {
  const tujuans = await prisma.tujuan.findMany({
    where: { tokohId },
  });
  return tujuans;
};

/**
 * Get a single Tujuan by its ID, ensuring it belongs to the TokohUtama.
 * @param {string} tujuanId - The ID of the Tujuan.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @returns {Promise<object>} The requested Tujuan.
 */
export const getTujuanById = async (tujuanId, tokohId) => {
  const tujuan = await prisma.tujuan.findUnique({
    where: { id: tujuanId, tokohId },
  });
  if (!tujuan) {
    throw new HttpException(404, 'Tujuan not found or does not belong to this user');
  }
  return tujuan;
};

/**
 * Update an existing Tujuan.
 * @param {string} tujuanId - The ID of the Tujuan to update.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @param {object} data - The data to update (jenis_tujuan, hasil).
 * @returns {Promise<object>} The updated Tujuan.
 */
export const updateTujuan = async (tujuanId, tokohId, data) => {
  await getTujuanById(tujuanId, tokohId); // Check if tujuan exists and belongs to user

  const updatedTujuan = await prisma.tujuan.update({
    where: { id: tujuanId },
    data,
  });
  return updatedTujuan;
};

/**
 * Delete a Tujuan.
 * @param {string} tujuanId - The ID of the Tujuan to delete.
 * @param {string} tokohId - The ID of the TokohUtama.
 */
export const deleteTujuan = async (tujuanId, tokohId) => {
  await getTujuanById(tujuanId, tokohId); // Check if tujuan exists and belongs to user

  const deletedTujuan = await prisma.tujuan.delete({
    where: { id: tujuanId },
  });
  return deletedTujuan;
};