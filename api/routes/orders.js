import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/order.js';
import { verifyAdmin, verifyChefORAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok
router.post('/:id/:prodId', verifyUser, createOrder);

//UPDATE ok
router.put("/:orderId", verifyUser, updateOrder);

//DELETE ok
router.delete("/:id/:orderId", verifyUser, deleteOrder);

//GET ok
router.get("/:orderId", verifyChefORAdmin, getOrder);

//GET ALL ok
router.get("/", verifyChefORAdmin, getOrders);

export default router;