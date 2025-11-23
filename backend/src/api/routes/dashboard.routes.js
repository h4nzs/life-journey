import express from 'express';
import { getStats } from '../../controllers/dashboard.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/stats').get(getStats);

export default router;