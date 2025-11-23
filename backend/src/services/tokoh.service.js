import prisma from '../config/db.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Get the profile of the logged-in user.
 * @param {string} userId - The ID of the logged-in user.
 * @returns {Promise<object>} The user's TokohUtama profile.
 */
export const getMyTokoh = async (userId) => {
  const tokoh = await prisma.tokohUtama.findUnique({
    where: { userId },
  });

  if (!tokoh) {
    throw new HttpException(404, "TokohUtama profile not found for this user");
  }

  return tokoh;
};

/**
 * Update the profile of the logged-in user.
 * @param {string} userId - The ID of the logged-in user.
 * @param {object} data - The data to update.
 * @returns {Promise<object>} The updated TokohUtama profile.
 */
export const updateMyTokoh = async (userId, data) => {
    const tokoh = await prisma.tokohUtama.findUnique({
        where: { userId },
    });

    if (!tokoh) {
        throw new HttpException(404, "TokohUtama profile not found for this user");
    }

    const updatedTokoh = await prisma.tokohUtama.update({
        where: { userId },
        data,
    });

    return updatedTokoh;
};