import express from 'express';
import {
  addPerjalanan,
  getTujuanPerjalanans,
  getSinglePerjalanan,
  updateSinglePerjalanan,
  deleteSinglePerjalanan,
} from '../../controllers/perjalanan.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import { perjalananSchema, updatePerjalananSchema } from '../../validations/perjalanan.validation.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

// Routes for Perjalanan specific to a Tujuan (e.g., POST /tujuan/:tujuanId/perjalanan)
// Note: This route will be mounted dynamically in app.js or a parent router
// so that :tujuanId is accessible.
router.route('/tujuan/:tujuanId/perjalanan')
  .post(validate(perjalananSchema), addPerjalanan)
  .get(getTujuanPerjalanans);

// Routes for individual Perjalanan operations
router.route('/perjalanan/:id')
  .get(getSinglePerjalanan)
  .put(validate(updatePerjalananSchema), updateSinglePerjalanan)
  .delete(deleteSinglePerjalanan);

export default router;