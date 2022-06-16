import Order from "../models/Order.js";
import User from "../models/User.js";


//UPDATE
export const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

//DELETE
export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

//GET
export const getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};
//GET ALL
export const getUsers = async(req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

//GET USER'S ORDERS
export const getUserOrders = async(req, res, next) => {
    try {
        const ORDERS = await Order.find({ user: req.params.id })
        res.status(200).json(ORDERS)
    } catch (err) {
        next(err)
    }
};