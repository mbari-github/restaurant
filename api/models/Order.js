import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    table: {
        type: Number,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    state: {
        type: String,
    },
    taken: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);