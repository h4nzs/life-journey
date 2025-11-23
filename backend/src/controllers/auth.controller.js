import asyncHandler from 'express-async-handler';
import { registerUser, loginUser } from '../services/auth.service.js';

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await registerUser(email, password);
  
  res.status(201).json({
    message: 'User registered successfully',
    data: {
      user,
      token,
    },
  });
});

/**
 * @desc    Auth user & get token
 * @route   POST /auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);

  res.status(200).json({
    message: 'User logged in successfully',
    data: {
      user,
      token,
    },
  });
});