import asyncHandler from 'express-async-handler';
import { getDashboardStats } from '../services/dashboard.service.js';

/**
 * @desc    Get dashboard statistics for the logged-in user
 * @route   GET /dashboard/stats
 * @access  Private
 */
export const getStats = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id; // From auth middleware
  const stats = await getDashboardStats(tokohId);
  res.status(200).json({
    message: 'Dashboard stats fetched successfully',
    data: stats,
  });
});