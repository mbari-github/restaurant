import Order from "../models/Order.js";
import User from "../models/User.js";
import mongoose from "mongoose";

import { createError } from "../utils/error.js";
import Product from "../models/Product.js";


//CREATE OBSOLETO 
//Un ordine per un prodotto --> se si vogliono più prodotti si fanno più ordini
/*export const createOrder = async(req, res, next) => {
    try {

        const prod = await Product.findById(req.params.prodId);
        let user;
        User.findById(req.params.id)
            .then(USER => user = USER)
            .then(() => {
                return Order.create({
                    user: mongoose.Types.ObjectId(req.params.id),
                    products: prod,
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
};*/

//CREATE AND ADD A PROD /:id/:prodId     ok
export const addProdToOrder = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        const prod = await Product.findById(req.params.prodId);

        if (user.order === null) {
            const ORDER = await Order.create({
                user: mongoose.Types.ObjectId(req.params.id),
                products: [prod],
                total: prod.price
            });
            user.order = ORDER;
            user.save();
            res.status(200).json(ORDER)
        } else {
            //const ORDER = await Order.findOneAndUpdate({ user: req.params.id }, { $push: { products: prod } }, { new: true });
            const order = await Order.findOne({ user: req.params.id });
            let T = order.total + prod.price;
            await order.updateOne({ $set: { total: T } }, { new: true });
            const ORDER = await Order.findByIdAndUpdate(order._id, { $push: { products: prod } }, { new: true })
            res.status(200).json(ORDER);
        }
    } catch (err) {
        next(err);
    }
}

//UPDATE /:id/:orderId
//metodo per l'admin o cuoco di gestire lo status dell'ordine
export const updateOrder = async(req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, { $set: { status: req.body.status } }, { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        next(err)
    }
};
//DELETE /:id  ok
export const deleteOrder = async(req, res, next) => {
    try {
        //await User.findOneAndUpdate({ order: req.params.orderId }, { $set: { order: null } });
        //await Order.findByIdAndDelete(req.params.orderId);
        const user = await User.findById(req.params.id);
        await Order.findOneAndDelete({ _id: user.order });
        user.order = null;
        user.save();
        res.status(200).json("Order has been deleted");
    } catch (err) {
        next(err);
    }
};
//(UPDATE) DELETE A SINGLE PROD FROM ORDER /:id/:prodId    ok
export const deleteProdFromOrder = async(req, res, next) => {
    try {
        const prod = await Product.findById(req.params.prodId);
        const user = await User.findOne({ _id: req.params.id });
        const updatedOrder = await Order.findByIdAndUpdate({ _id: user.order }, { $pull: { products: prod } }, { new: true });

        res.status(200).json(updatedOrder);
    } catch (err) {
        next(err);
    }
};

//GET /:orderId  ok 
export const getOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};
//GET ALL /   ok
export const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        next(err)
    }
};
//GET ALL COMPLETED /completed 
export const getCompletedOrder = async(req, res, next) => {
    try {
        const orders = await Order.find({ status: "done" });
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};