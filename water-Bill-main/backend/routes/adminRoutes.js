import { Router } from 'express';
import { authenticate, authorize, ROLES } from '../middleware/auth.js';
import {
  getWaterFetchControl,
  setWaterFetchControl,
} from '../controllers/waterControlController.js';
import {
  listAdminCards,
  createAdminCard,
  setAdminCardActive,
  rechargeAdminCard,
} from '../controllers/adminCardController.js';

const router = Router();

router.get('/system/water-fetch', authenticate, authorize(ROLES.ADMIN), getWaterFetchControl);
router.patch('/system/water-fetch', authenticate, authorize(ROLES.ADMIN), setWaterFetchControl);

router.get('/cards', authenticate, authorize(ROLES.ADMIN), listAdminCards);
router.post('/cards', authenticate, authorize(ROLES.ADMIN), createAdminCard);
router.patch('/cards/:cardId/active', authenticate, authorize(ROLES.ADMIN), setAdminCardActive);
router.post('/cards/:cardId/recharge', authenticate, authorize(ROLES.ADMIN), rechargeAdminCard);

export default router;

