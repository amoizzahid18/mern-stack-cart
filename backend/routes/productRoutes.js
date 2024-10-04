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
  getTotalCartItems
} = require("../controller/productControllers");

//get all products from db
router.get("/", getAllProducts);

//post item to cart
router.post("/cart", putCartItem);

//get items from cart
router.get("/cart", getCartItems);

//get a product by id from db
router.get("/product/:id", getProductById);


//update product
router.put("/product/:id", updateProduct);

//add products
router.post("/addproduct", addProduct);

//delete product
router.delete("/delproduct/:id", deleteProduct);

//remove from cart
router.delete("/cart/:id", removeCartItem);

//delete whole cart
router.delete("/cart", deleteCart);

//get total cart items 
router.get("/cart/quantity", getTotalCartItems);
module.exports = router;
