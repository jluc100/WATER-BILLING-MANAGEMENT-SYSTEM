import { Router } from 'express';
import {
  listUsers,
  listPendingCustomers,
  updateAccountApproval,
  updateUserRole,
  deleteUser,
} from '../controllers/userController.js';
import { authenticate, authorize, ROLES } from '../middleware/auth.js';

const router = Router();
const managers = [ROLES.ADMIN, ROLES.WASAC_MANAGER];

router.get('/pending', authenticate, authorize(...managers), listPendingCustomers);
router.get('/', authenticate, authorize(ROLES.ADMIN), listUsers);
router.patch('/:userId/approval', authenticate, authorize(...managers), updateAccountApproval);
router.patch('/:userId/role', authenticate, authorize(ROLES.ADMIN), updateUserRole);
router.delete('/:userId', authenticate, authorize(ROLES.ADMIN), deleteUser);

export default router;
