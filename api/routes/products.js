import express from 'express';
import { createProdoct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/product.js';
import { verifyAdmin, verifyChef, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE ok 
router.post('/', verifyAdmin, createProdoct);

//UPDATE ok
router.put("/:id", verifyAdmin, updateProduct);

//DELETE ok
router.delete("/:id", verifyAdmin, deleteProduct);

//GET ok
router.get("/:id", getProduct);

//GET ALL ok
router.get("/", getProducts);

export default router;