import express from 'express';
import {
  addEmosi,
  getRintanganEmosis,
  getSingleEmosi,
  updateSingleEmosi,
  deleteSingleEmosi,
} from '../../controllers/emosi.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import { emosiSchema, updateEmosiSchema } from '../../validations/emosi.validation.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

// Routes for Emosi specific to a Rintangan (e.g., POST /rintangan/:rintanganId/emosi)
// Note: This route will be mounted dynamically in app.js or a parent router
// so that :rintanganId is accessible.
router.route('/rintangan/:rintanganId/emosi')
  .post(validate(emosiSchema), addEmosi)
  .get(getRintanganEmosis);

// Routes for individual Emosi operations
router.route('/emosi/:id')
  .get(getSingleEmosi)
  .put(validate(updateEmosiSchema), updateSingleEmosi)
  .delete(deleteSingleEmosi);

export default router;