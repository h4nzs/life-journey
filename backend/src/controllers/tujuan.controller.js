import asyncHandler from 'express-async-handler';
import {
  createTujuan,
  getTujuans,
  getTujuanById,
  updateTujuan,
  deleteTujuan,
} from '../services/tujuan.service.js';

/**
 * @desc    Create a new Tujuan
 * @route   POST /tujuan
 * @access  Private
 */
export const addTujuan = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id; // From auth middleware
  const tujuan = await createTujuan(tokohId, req.body);
  res.status(201).json({
    message: 'Tujuan created successfully',
    data: tujuan,
  });
});

/**
 * @desc    Get all Tujuans for the logged-in user
 * @route   GET /tujuan
 * @access  Private
 */
export const getUserTujuans = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id;
  const tujuans = await getTujuans(tokohId);
  res.status(200).json({
    message: 'Tujuans fetched successfully',
    data: tujuans,
  });
});

/**
 * @desc    Get single Tujuan by ID
 * @route   GET /tujuan/:id
 * @access  Private
 */
export const getSingleTujuan = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id;
  const tujuan = await getTujuanById(req.params.id, tokohId);
  res.status(200).json({
    message: 'Tujuan fetched successfully',
    data: tujuan,
  });
});

/**
 * @desc    Update a Tujuan
 * @route   PUT /tujuan/:id
 * @access  Private
 */
export const updateSingleTujuan = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id;
  const updatedTujuan = await updateTujuan(req.params.id, tokohId, req.body);
  res.status(200).json({
    message: 'Tujuan updated successfully',
    data: updatedTujuan,
  });
});

/**
 * @desc    Delete a Tujuan
 * @route   DELETE /tujuan/:id
 * @access  Private
 */
export const deleteSingleTujuan = asyncHandler(async (req, res) => {
  const tokohId = req.user.tokoh.id;
  const deletedTujuan = await deleteTujuan(req.params.id, tokohId);
  res.status(200).json({
    message: 'Tujuan deleted successfully',
    data: deletedTujuan,
  });
});