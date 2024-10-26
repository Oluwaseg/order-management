import express from 'express';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from '../controllers/order.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.patch('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

export default router;
