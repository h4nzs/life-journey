import asyncHandler from 'express-async-handler';
import {
  createPerjalanan,
  getPerjalanansByTujuan,
  getPerjalananById,
  updatePerjalanan,
  deletePerjalanan,
} from '../services/perjalanan.service.js';

/**
 * @desc    Create a new Perjalanan for a specific Tujuan
 * @route   POST /tujuan/:tujuanId/perjalanan
 * @access  Private
 */
export const addPerjalanan = asyncHandler(async (req, res) => {
  const { tujuanId } = req.params;
  const tokohId = req.user.tokoh.id;
  const perjalanan = await createPerjalanan(tujuanId, tokohId, req.body);
  res.status(201).json({
    message: 'Perjalanan created successfully',
    data: perjalanan,
  });
});

/**
 * @desc    Get all Perjalanans for a specific Tujuan
 * @route   GET /tujuan/:tujuanId/perjalanan
 * @access  Private
 */
export const getTujuanPerjalanans = asyncHandler(async (req, res) => {
  const { tujuanId } = req.params;
  const tokohId = req.user.tokoh.id;
  const perjalanans = await getPerjalanansByTujuan(tujuanId, tokohId);
  res.status(200).json({
    message: 'Perjalanans fetched successfully',
    data: perjalanans,
  });
});

/**
 * @desc    Get single Perjalanan by ID
 * @route   GET /perjalanan/:id
 * @access  Private
 */
export const getSinglePerjalanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const perjalanan = await getPerjalananById(id, tokohId);
  res.status(200).json({
    message: 'Perjalanan fetched successfully',
    data: perjalanan,
  });
});

/**
 * @desc    Update a Perjalanan
 * @route   PUT /perjalanan/:id
 * @access  Private
 */
export const updateSinglePerjalanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const updatedPerjalanan = await updatePerjalanan(id, tokohId, req.body);
  res.status(200).json({
    message: 'Perjalanan updated successfully',
    data: updatedPerjalanan,
  });
});

/**
 * @desc    Delete a Perjalanan
 * @route   DELETE /perjalanan/:id
 * @access  Private
 */
export const deleteSinglePerjalanan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const deletedPerjalanan = await deletePerjalanan(id, tokohId);
  res.status(200).json({
    message: 'Perjalanan deleted successfully',
    data: deletedPerjalanan
  });
});