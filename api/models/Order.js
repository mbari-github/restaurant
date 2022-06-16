import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "User"
    },
    products: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    taken: {
        type: Boolean,
        default: false
    }


}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);