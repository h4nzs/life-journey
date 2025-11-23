import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Helper to check if a Rintangan belongs to the authenticated TokohUtama.
 * @param {string} rintanganId - The ID of the Rintangan.
 * @param {string} tokohId - The ID of the TokohUtama.
 * @returns {Promise<boolean>} True if the Rintangan belongs to the TokohUtama, false otherwise.
 */
const checkRintanganOwnership = async (rintanganId, tokohId) => {
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
  return rintangan && rintangan.perjalanan.tujuan.tokohId === tokohId;
};

/**
 * Create a new Emosi for a specific Rintangan.
 * @param {string} rintanganId - The ID of the Rintangan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data for the new Emosi (jenis_emosi).
 * @returns {Promise<object>} The created Emosi.
 */
export const createEmosi = async (rintanganId, tokohId, data) => {
  if (!(await checkRintanganOwnership(rintanganId, tokohId))) {
    throw new HttpException(404, 'Rintangan not found or does not belong to this user');
  }

  const emosi = await prisma.emosi.create({
    data: {
      ...data,
      rintanganId,
    },
  });
  return emosi;
};

/**
 * Get all Emosis for a specific Rintangan.
 * @param {string} rintanganId - The ID of the Rintangan.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<array>} A list of Emosis.
 */
export const getEmosisByRintangan = async (rintanganId, tokohId) => {
  if (!(await checkRintanganOwnership(rintanganId, tokohId))) {
    throw new HttpException(404, 'Rintangan not found or does not belong to this user');
  }

  const emosis = await prisma.emosi.findMany({
    where: { rintanganId },
  });
  return emosis;
};

/**
 * Get a single Emosi by its ID, ensuring it belongs to a Rintangan owned by the TokohUtama.
 * @param {string} emosiId - The ID of the Emosi.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @returns {Promise<object>} The requested Emosi.
 */
export const getEmosiById = async (emosiId, tokohId) => {
  const emosi = await prisma.emosi.findUnique({
    where: { id: emosiId },
    include: {
      rintangan: {
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
      },
    },
  });

  if (!emosi || emosi.rintangan.perjalanan.tujuan.tokohId !== tokohId) {
    throw new HttpException(404, 'Emosi not found or does not belong to this user');
  }
  return emosi;
};

/**
 * Update an existing Emosi.
 * @param {string} emosiId - The ID of the Emosi to update.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 * @param {object} data - The data to update (jenis_emosi).
 * @returns {Promise<object>} The updated Emosi.
 */
export const updateEmosi = async (emosiId, tokohId, data) => {
  await getEmosiById(emosiId, tokohId); // Check if it exists and belongs to user

  const updatedEmosi = await prisma.emosi.update({
    where: { id: emosiId },
    data,
  });
  return updatedEmosi;
};

/**
 * Delete an Emosi.
 * @param {string} emosiId - The ID of the Emosi to delete.
 * @param {string} tokohId - The ID of the TokohUtama (for verification).
 */
export const deleteEmosi = async (emosiId, tokohId) => {
  await getEmosiById(emosiId, tokohId); // Check if it exists and belongs to user

  await prisma.emosi.delete({
    where: { id: emosiId },
  });
};