import express from 'express';
import { addProdToOrder, deleteOrder, deleteProdFromOrder, getOrder, getOrders, updateOrder } from '../controllers/order.js';
import { verifyAdmin, verifyChefORAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok
router.post('/:id/:prodId', verifyUser, addProdToOrder);


//UPDATE ok
router.put("/:orderId", verifyChefORAdmin, updateOrder);

//DELETE ok
router.delete("/:id/:orderId", verifyUser, deleteOrder);

//DELETE A SINGLE PROD FROM AN ORDER
router.put("/:id/:prodId", verifyUser, deleteProdFromOrder)

//GET ok
router.get("/:orderId", verifyChefORAdmin, getOrder);

//GET ALL ok
router.get("/", verifyChefORAdmin, getOrders);

export default router;