const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  putCartItem,
  getCartItems,
  addProduct,
  updateProduct,
  removeCartItem,
  deleteProduct,
  deleteCart,
  getTotalCartItems,
  checkoutCart
} = require("../controller/productControllers");

//get all products from db
router.get("/", getAllProducts);

//get a product by id from db
router.get("/product/:id", getProductById);

//update product
router.put("/product/:id", updateProduct);

//add products
router.post("/addproduct", addProduct);

//delete product
router.delete("/delproduct/:id", deleteProduct);

//get items from cart
router.get("/cart", getCartItems);

//post item to cart
router.post("/cart", putCartItem);

//get total quantity cart items 
router.get("/cart/quantity", getTotalCartItems);

//checkout cart
router.delete("/cart/checkout", checkoutCart);

//remove from cart
router.delete("/cart/item/:id", removeCartItem);

//delete whole cart
router.delete("/cart", deleteCart);

module.exports = router;
