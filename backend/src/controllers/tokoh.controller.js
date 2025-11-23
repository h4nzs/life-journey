import asyncHandler from 'express-async-handler';
import { getMyTokoh, updateMyTokoh } from '../services/tokoh.service.js';

/**
 * @desc    Get user's TokohUtama profile
 * @route   GET /tokoh/me
 * @access  Private
 */
export const getMyProfile = asyncHandler(async (req, res) => {
  // req.user is attached by the 'protect' middleware
  const tokoh = await getMyTokoh(req.user.id);
  res.status(200).json({
    message: 'Profile fetched successfully',
    data: tokoh,
  });
});

/**
 * @desc    Update user's TokohUtama profile
 * @route   PUT /tokoh/me
 * @access  Private
 */
export const updateMyProfile = asyncHandler(async (req, res) => {
  const updatedTokoh = await updateMyTokoh(req.user.id, req.body);
  res.status(200).json({
    message: 'Profile updated successfully',
    data: updatedTokoh,
  });
});