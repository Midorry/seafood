import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
    {
        categoryId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            default: "",
        },
        quantity: {
            type: Number,
            default: 0,
        },
        desc: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default: "",
        },
        promotion: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
