import Order from "../models/Order.js";

import { createError } from "../utils/error.js";


//CREATE
export const createOrder = async(req, res, next) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err);
    }
};

//UPDATE
export const updateOrder = async(req, res, next) => {
    const orderId = req.params.orderid;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, { $push: req.body }, { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        next(err)
    }
};
//DELETE
export const deleteOrder = async(req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        next(err);
    }
};
//GET
export const getOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};
//GET ALL
export const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
};