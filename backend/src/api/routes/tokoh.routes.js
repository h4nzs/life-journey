import express from 'express';
import { getMyProfile, updateMyProfile } from '../../controllers/tokoh.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import { updateTokohSchema } from '../../validations/tokoh.validation.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/me')
  .get(getMyProfile)
  .put(validate(updateTokohSchema), updateMyProfile);

export default router;