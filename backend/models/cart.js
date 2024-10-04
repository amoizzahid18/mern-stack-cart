    // models/Cart.js
    const mongoose = require("mongoose");

    const cartSchema = new mongoose.Schema({
        product: {
            type: mongoose.Schema.Types.ObjectId, // Reference to Product model
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Default quantity is 1
        }
    });

    const Cart = mongoose.model("Cart", cartSchema);
    module.exports = Cart;
