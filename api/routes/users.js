import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    getUserOrders,
} from "../controllers/user.js";
import { verifyAdmin, verifyChef, verifyChefORAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

////////////////////// CHECK DI PROVA ////////////////////////////////////
router.get("/checkauthentication", verifyToken, (req, res, next) => {
    res.send("hello user, you are logged in")
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("hello user, you are logged in and you can delete your account")
});

router.get("/checkadmin", verifyAdmin, (req, res, next) => {
    res.send("hello admin, you are logged in and you can delete all accounts")
});

router.get("/checkchef", verifyChef, (req, res, next) => {
    res.send("hello chef")
});
router.get("/checkchefORadmin", verifyChefORAdmin, (req, res, next) => {
    res.send("hello chef/admin")
});
/////////////////////////////////////////////////////////////////////////////


//UPDATE
router.put("/:id", verifyAdmin, updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

//  GET USER'S ORDER
router.get("/:id/orders", verifyUser, getUserOrders);

export default router;