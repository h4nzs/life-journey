import prisma from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/password.utils.js';
import { generateToken } from '../utils/jwt.utils.js';
import { HttpException } from '../utils/HttpException.js';

/**
 * Registers a new user and creates an associated 'TokohUtama'.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: object, token: string}>} The created user and JWT.
 */
export const registerUser = async (email, password) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new HttpException(409, 'User with this email already exists');
  }

  const hashedPassword = await hashPassword(password);

  // Create user and TokohUtama in a transaction
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      tokoh: {
        create: {
          // Initialize with default/empty values
          tekad: 'Belum diatur',
          keimanan: 'Belum diatur',
          kondisi_jiwa: 'Belum diatur',
        },
      },
    },
    include: {
      tokoh: true, // Include the created tokoh in the result
    },
  });

  const token = generateToken(newUser.id);

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser;

  return { user: userWithoutPassword, token };
};

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<{user: object, token: string}>} The user and JWT.
 */
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { tokoh: true },
  });

  if (!user || !(await comparePassword(password, user.password))) {
    throw new HttpException(401, 'Invalid email or password');
  }

  const token = generateToken(user.id);

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};