import asyncHandler from 'express-async-handler';
import {
  createEmosi,
  getEmosisByRintangan,
  getEmosiById,
  updateEmosi,
  deleteEmosi,
} from '../services/emosi.service.js';

/**
 * @desc    Create a new Emosi for a specific Rintangan
 * @route   POST /rintangan/:rintanganId/emosi
 * @access  Private
 */
export const addEmosi = asyncHandler(async (req, res) => {
  const { rintanganId } = req.params;
  const tokohId = req.user.tokoh.id;
  const emosi = await createEmosi(rintanganId, tokohId, req.body);
  res.status(201).json({
    message: 'Emosi created successfully',
    data: emosi,
  });
});

/**
 * @desc    Get all Emosis for a specific Rintangan
 * @route   GET /rintangan/:rintanganId/emosi
 * @access  Private
 */
export const getRintanganEmosis = asyncHandler(async (req, res) => {
  const { rintanganId } = req.params;
  const tokohId = req.user.tokoh.id;
  const emosis = await getEmosisByRintangan(rintanganId, tokohId);
  res.status(200).json({
    message: 'Emosis fetched successfully',
    data: emosis,
  });
});

/**
 * @desc    Get single Emosi by ID
 * @route   GET /emosi/:id
 * @access  Private
 */
export const getSingleEmosi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const emosi = await getEmosiById(id, tokohId);
  res.status(200).json({
    message: 'Emosi fetched successfully',
    data: emosi,
  });
});

/**
 * @desc    Update an Emosi
 * @route   PUT /emosi/:id
 * @access  Private
 */
export const updateSingleEmosi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  const updatedEmosi = await updateEmosi(id, tokohId, req.body);
  res.status(200).json({
    message: 'Emosi updated successfully',
    data: updatedEmosi,
  });
});

/**
 * @desc    Delete an Emosi
 * @route   DELETE /emosi/:id
 * @access  Private
 */
export const deleteSingleEmosi = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tokohId = req.user.tokoh.id;
  await deleteEmosi(id, tokohId);
  res.status(200).json({
    message: 'Emosi deleted successfully',
  });
});