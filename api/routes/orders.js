import express from 'express';
import { addProdToOrder, deleteOrder, deleteProdFromOrder, getCompletedOrder, getOrder, getOrders, updateOrder } from '../controllers/order.js';
import { verifyAdmin, verifyChefORAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok
router.post('/:id/:prodId', verifyUser, addProdToOrder);

//DELETE ok
router.delete("/:id", verifyUser, deleteOrder);

//DELETE A SINGLE PROD FROM AN ORDER
router.put("/:id/:prodId", verifyUser, deleteProdFromOrder)

//UPDATE ok
router.put("/:orderId", verifyChefORAdmin, updateOrder);

//GET ALL ok
router.get("/", verifyChefORAdmin, getOrders);

//GET ALL COMPLETED   ok
router.get("/done", verifyAdmin, getCompletedOrder);

//GET ok
router.get("/:orderId", verifyChefORAdmin, getOrder);

export default router;