import asyncHandler from 'express-async-handler';
import {
  createRintangan,
  getRintangansByPerjalanan,
  getRintanganById,
  updateRintangan,
  deleteRintangan,
} from '../services/rintangan.service.js';

/**
 * @desc    Create a new Rintangan for a specific Perjalanan
 * @route   POST /perjalanan/:perjalananId/rintangan
 * @access  Private
 */
export const addRintangan = asyncHandler(async (req, res) => {
  const { perjalananId } = req.params;
  const tokohId = req.user.tokoh.id;
  const rintangan = await createRintangan(perjalananId, tokohId, req.body);
  res.status(201).json({
    message: 'Rintangan created successfully',
    data: rintangan,
  });
});

/**
 * @desc    Get all Rintangans for a specific Perjalanan
 * @route   GET /perjalanan/:perjalananId/rintangan
 * @access  Private
 */
export const getPerjalananRintangans = asyncHandler(async (req, res) => {
  const { perjalananId } = req.params;
  const tokohId = req.user.tokoh.id;
  const rintangans = await getRintangansByPerjalanan(perjalananId, tokohId);
  res.status(200).json({
    message: 'Rintangans fetched successfully',
    data: rintangans,
  });
});

/**
 * @desc    Get single Rintangan by ID
 * @route   GET /rintangan/:id
 * @access  Private
 */
export const getSingleRintangan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const rintangan = await getRintanganById(id, tokohId);
  res.status(200).json({
    message: 'Rintangan fetched successfully',
    data: rintangan,
  });
});

/**
 * @desc    Update a Rintangan
 * @route   PUT /rintangan/:id
 * @access  Private
 */
export const updateSingleRintangan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const updatedRintangan = await updateRintangan(id, tokohId, req.body);
  res.status(200).json({
    message: 'Rintangan updated successfully',
    data: updatedRintangan,
  });
});

/**
 * @desc    Delete a Rintangan
 * @route   DELETE /rintangan/:id
 * @access  Private
 */
export const deleteSingleRintangan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  await deleteRintangan(id, tokohId);
  res.status(200).json({
    message: 'Rintangan deleted successfully',
  });
});