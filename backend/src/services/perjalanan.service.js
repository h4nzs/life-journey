import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Create a new Perjalanan for a specific Tujuan.
 * @param {string} tujuanId - The ID of the Tujuan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data for the new Perjalanan (arah, ketahanan).
 * @returns {Promise<object>} The created Perjalanan.
 */
export const createPerjalanan = async (tujuanId, tokohId, data) => {
  // Verify that the Tujuan belongs to the TokohUtama
  const tujuan = await prisma.tujuan.findUnique({
    where: { id: tujuanId, tokohId },
  });
  if (!tujuan) {
    throw new HttpException(404, 'Tujuan not found or does not belong to this user');
  }

  const perjalanan = await prisma.perjalanan.create({
    data: {
      ...data,
      tujuanId,
    },
  });
  return perjalanan;
};

/**
 * Get all Perjalanans for a specific Tujuan.
 * @param {string} tujuanId - The ID of the Tujuan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<array>} A list of Perjalanans.
 */
export const getPerjalanansByTujuan = async (tujuanId, tokohId) => {
  // Verify that the Tujuan belongs to the TokohUtama
  const tujuan = await prisma.tujuan.findUnique({
    where: { id: tujuanId, tokohId },
  });
  if (!tujuan) {
    throw new HttpException(404, 'Tujuan not found or does not belong to this user');
  }

  const perjalanans = await prisma.perjalanan.findMany({
    where: { tujuanId },
  });
  return perjalanans;
};

/**
 * Get a single Perjalanan by its ID, ensuring it belongs to a Tujuan owned by the TokohUtama.
 * @param {string} perjalananId - The ID of the Perjalanan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<object>} The requested Perjalanan.
 */
export const getPerjalananById = async (perjalananId, tokohId) => {
  const perjalanan = await prisma.perjalanan.findUnique({
    where: { id: perjalananId },
    include: {
      tujuan: {
        select: {
          tokohId: true,
        },
      },
    },
  });

  if (!perjalanan || perjalanan.tujuan.tokohId !== tokohId) {
    throw new HttpException(404, 'Perjalanan not found or does not belong to this user');
  }
  return perjalanan;
};

/**
 * Update an existing Perjalanan.
 * @param {string} perjalananId - The ID of the Perjalanan to update.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data to update (arah, ketahanan).
 * @returns {Promise<object>} The updated Perjalanan.
 */
export const updatePerjalanan = async (perjalananId, tokohId, data) => {
  await getPerjalananById(perjalananId, tokohId); // Check if it exists and belongs to user

  const updatedPerjalanan = await prisma.perjalanan.update({
    where: { id: perjalananId },
    data,
  });
  return updatedPerjalanan;
};

/**
 * Delete a Perjalanan.
 * @param {string} perjalananId - The ID of the Perjalanan to delete.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 */
export const deletePerjalanan = async (perjalananId, tokohId) => {
  await getPerjalananById(perjalananId, tokohId); // Check if it exists and belongs to user

  const deletedPerjalanan = await prisma.perjalanan.delete({
    where: { id: perjalananId },
  });
  return deletedPerjalanan;
};