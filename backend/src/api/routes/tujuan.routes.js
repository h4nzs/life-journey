import express from 'express';
import {
  addTujuan,
  getUserTujuans,
  getSingleTujuan,
  updateSingleTujuan,
  deleteSingleTujuan,
} from '../../controllers/tujuan.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validation.middleware.js';
import { tujuanSchema, updateTujuanSchema } from '../../validations/tujuan.validation.js';

const router = express.Router();

// All routes in this file are protected
router.use(protect);

router.route('/')
  .post(validate(tujuanSchema), addTujuan)
  .get(getUserTujuans);

router.route('/:id')
  .get(getSingleTujuan)
  .put(validate(updateTujuanSchema), updateSingleTujuan)
  .delete(deleteSingleTujuan);

export default router;