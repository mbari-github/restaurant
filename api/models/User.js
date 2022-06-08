import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isChef: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);