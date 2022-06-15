import Order from "../models/Order.js";
import User from "../models/User.js";
import mongoose from "mongoose";

import { createError } from "../utils/error.js";


//CREATE
export const createOrder = async(req, res, next) => {
    try {
        let user;
        User.findById(req.params.id)
            .then(USER => user = USER)
            .then(() => {
                return Order.create({
                    user: mongoose.Types.ObjectId(req.params.id),
                    products: req.body.products,
                })
            })
            .then(ORDER => {
                user.orders.push(ORDER);
                user.save();
            })
            .then(() => res.json({ message: 'Inserimento effettuato' }));
    } catch (err) {
        next(err)
    }
};
/*
//CREATE
export const createOrder = async(req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

        const user = await User.findByIdAndUpdate(
            req.params.id, { $push: req.body.orders }, { new: true });

        res.status(200).json(user)

    } catch (err) {
        next(err);
    }
};*/

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