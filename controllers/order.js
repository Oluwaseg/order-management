import Order from '../models/Order.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ErrorHandler } from '../utils/errorHandler.js'; // Import your custom ErrorHandler

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orders'
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 */
export const createOrder = asyncHandler(async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const order = new Order({ productId, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Orders'
 *       500:
 *         description: Internal Server Error
 */
export const getOrders = asyncHandler(async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orders'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 */
export const getOrderById = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    res.json(order);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Orders'
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 */
export const updateOrder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    res.json(order);
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       204:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 */
export const deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return next(new ErrorHandler('Order not found', 404));
    }
    res.status(204).send();
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
});
