import express from 'express';
import {
  addRintangan,
  getPerjalananRintangans,
  getSingleRintangan,
  updateSingleRintangan,
  deleteSingleRintangan,
} from '../../controllers/rintangan.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import { rintanganSchema, updateRintanganSchema } from '../../validations/rintangan.validation.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

// Routes for Rintangan specific to a Perjalanan (e.g., POST /perjalanan/:perjalananId/rintangan)
// Note: This route will be mounted dynamically in app.js or a parent router
// so that :perjalananId is accessible.
router.route('/perjalanan/:perjalananId/rintangan')
  .post(validate(rintanganSchema), addRintangan)
  .get(getPerjalananRintangans);

// Routes for individual Rintangan operations
router.route('/rintangan/:id')
  .get(getSingleRintangan)
  .put(validate(updateRintanganSchema), updateSingleRintangan)
  .delete(deleteSingleRintangan);

export default router;