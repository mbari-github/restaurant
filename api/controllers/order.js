import Order from "../models/Order.js";
import User from "../models/User.js";
import mongoose from "mongoose";

import { createError } from "../utils/error.js";
import Product from "../models/Product.js";


//CREATE
//Un ordine per un prodotto --> se si vogliono più prodotti si fanno più ordini
export const createOrder = async(req, res, next) => {
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
};
/*
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\DA IGNORARE////////////////////////////////////////////////////////////////////////
//ADD PROD TO ORDER   PROVA
//scenario: l'utente inizialmente si trova in una pagina dove scrolla i prodotti presenti nel menù; dopo aver trovato ciò
//che vuole clicca sul prodotto e viene reiderizzato ad un URL composto da ..../id/prodId, dove il primo id è dell'utente e il secondo è del prodotto.
//Quindi per questa funzione si ha a disposizione anche l'id del prodotto, che dovrà essere aggiunto alla lista orders dell'utente corrispondente a quell'id

export const addProdToOrder = async(req, res, next) => {
    try {
        const prod = await Product.findById(req.params.prodId);
        const user = await User.findById(req.params.id);

        if (user.orders.length === 0) {
            Order.create({
                    user: mongoose.Types.ObjectId(req.params.id),
                    products: prod
                })
                .then(ORDER => {
                    user.orders.push(ORDER);
                    user.save();
                })
                .then(() => res.json({ message: 'Inserimento effettuato' }));

        }else{
            const updatedOrder = await Order.findByIdAndUpdate(
                user.
            )
        }
    } catch (err) {
        next(err)
    }
}
*/
//UPDATE
//metodo per l'admin o cuoco di gestire lo status dell'ordine
export const updateOrder = async(req, res, next) => {
    const orderId = req.params.orderId;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedOrder)
    } catch (err) {
        next(err)
    }
};
//DELETE
export const deleteOrder = async(req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId);

        const user = await User.findByIdAndUpdate(
            req.params.id, { $pull: { orders: req.params.orderId } }, { safe: true }
        );
        res.status(200).json("Order has been deleted");
    } catch (err) {
        next(err);
    }
};
//GET
export const getOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);
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