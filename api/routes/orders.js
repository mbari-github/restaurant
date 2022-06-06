import express from 'express';
import { addProdToOrder, createOrder, deleteOrder, getOrder, getOrders, updateOrder } from '../controllers/order.js';
import { verifyAdmin, verifyChefORAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok
router.post('/:id', verifyUser, createOrder);

//UPDATE 1:ok  2:    (funzionano, ma da admin o chef)
router.put("/:id", verifyAdmin, updateOrder);
router.put("/add/:id", verifyUser, addProdToOrder);

//DELETE ok
router.delete("/:id", verifyChefORAdmin, deleteOrder);

//GET ok
router.get("/:id", verifyChefORAdmin, getOrder);

//GET ALL ok
router.get("/", verifyChefORAdmin, getOrders);

export default router;