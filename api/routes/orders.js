import express from 'express';
import { createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/order.js';
import { verifyAdmin, verifyChefORAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok
router.post('/:id', verifyUser, createOrder);

//UPDATE ok
router.put("/:id/:orderid", verifyUser, updateOrder);

//DELETE ok
router.delete("/:id", verifyChefORAdmin, deleteOrder);

//GET ok
router.get("/:id", verifyChefORAdmin, getOrder);

//GET ALL ok
router.get("/", verifyChefORAdmin, getOrders);

export default router;