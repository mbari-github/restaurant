import Product from "../models/Product.js";
import Order from "../models/Order.js";

//CREATE
export const createProdoct = async(req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        next(err);
    }
};
//UPDATE
export const updateProduct = async(req, res, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updateProduct);
    } catch (err) {
        next(err)
    }
};
//DELETE
export const deleteProduct = async(req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted from the list");
    } catch (err) {
        next(err)
    }
};
//GET
export const getProduct = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        next(err)

    }
};
//GET ALL
export const getProducts = async(req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (err) {
        next(err)
    }
};