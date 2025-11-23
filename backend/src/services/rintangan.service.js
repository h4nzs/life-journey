import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Helper to check if a Perjalanan belongs to the authenticated TokohUtama.
 * @param {string} perjalananId - The ID of the Perjalanan.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @returns {Promise<boolean>} True if the Perjalanan belongs to the TokohUtama, false otherwise.
 */
const checkPerjalananOwnership = async (perjalananId, tokohId) => {
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
  return perjalanan && perjalanan.tujuan.tokohId === tokohId;
};

/**
 * Create a new Rintangan for a specific Perjalanan.
 * @param {string} perjalananId - The ID of the Perjalanan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data for the new Rintangan (jenis_rintangan).
 * @returns {Promise<object>} The created Rintangan.
 */
export const createRintangan = async (perjalananId, tokohId, data) => {
  if (!(await checkPerjalananOwnership(perjalananId, tokohId))) {
    throw new HttpException(404, 'Perjalanan not found or does not belong to this user');
  }

  const rintangan = await prisma.rintangan.create({
    data: {
      ...data,
      perjalananId,
    },
  });
  return rintangan;
};

/**
 * Get all Rintangans for a specific Perjalanan.
 * @param {string} perjalananId - The ID of the Perjalanan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<array>} A list of Rintangans.
 */
export const getRintangansByPerjalanan = async (perjalananId, tokohId) => {
  if (!(await checkPerjalananOwnership(perjalananId, tokohId))) {
    throw new HttpException(404, 'Perjalanan not found or does not belong to this user');
  }

  const rintangans = await prisma.rintangan.findMany({
    where: { perjalananId },
  });
  return rintangans;
};

/**
 * Get a single Rintangan by its ID, ensuring it belongs to a Perjalanan owned by the TokohUtama.
 * @param {string} rintanganId - The ID of the Rintangan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<object>} The requested Rintangan.
 */
export const getRintanganById = async (rintanganId, tokohId) => {
  const rintangan = await prisma.rintangan.findUnique({
    where: { id: rintanganId },
    include: {
      perjalanan: {
        include: {
          tujuan: {
            select: {
              tokohId: true,
            },
          },
        },
      },
    },
  });

  if (!rintangan || rintangan.perjalanan.tujuan.tokohId !== tokohId) {
    throw new HttpException(404, 'Rintangan not found or does not belong to this user');
  }
  return rintangan;
};

/**
 * Update an existing Rintangan.
 * @param {string} rintanganId - The ID of the Rintangan to update.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data to update (jenis_rintangan).
 * @returns {Promise<object>} The updated Rintangan.
 */
export const updateRintangan = async (rintanganId, tokohId, data) => {
  await getRintanganById(rintanganId, tokohId); // Check if it exists and belongs to user

  const updatedRintangan = await prisma.rintangan.update({
    where: { id: rintanganId },
    data,
  });
  return updatedRintangan;
};

/**
 * Delete a Rintangan.
 * @param {string} rintanganId - The ID of the Rintangan to delete.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 */
export const deleteRintangan = async (rintanganId, tokohId) => {
  await getRintanganById(rintanganId, tokohId); // Check if it exists and belongs to user

  await prisma.rintangan.delete({
    where: { id: rintanganId },
  });
};