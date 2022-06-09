import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        text: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [String]
    },
    ingredients: {
        type: [String],
    },
    disp: {
        type: Boolean,
        default: true
    }

});

export default mongoose.model("Product", ProductSchema);