const Product = require("../models/product");
const Cart = require("../models/cart");


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
        res.status(200)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error while getting products from db"})        
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.json(product)
        res.status(200)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server error while getting product from db"})        
    }
}

const putCartItem = async (req, res) =>  {
    try {
        const { product, quantity } = req.body;

        // Check if the item already exists in the cart
        const existingItem = await Cart.findOne({ product });

        if (existingItem) {
            // If it exists, update the quantity
            existingItem.quantity += quantity; 
            await existingItem.save();
            return res.status(200).json(existingItem);
        }

        // If it does not exist, create a new item
        const newItem = new Cart({ product, quantity });
        await newItem.save();
        res.status(201).json(newItem); // Respond with 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the product to cart' });
    }
};

const getCartItems = async (req, res) => {
    try {
        const items = await Cart.find({}).populate('product'); // Populate product details
        res.status(200).json(items);
    } catch (error) {
        console.log(error,"error");
        res.status(500).json({ message: "Server error while getting cart items from db" });        
    }
};
     
const addProduct = async (req, res) => {
    try {
        const { name, description, price ,countInStock, imageURL} = req.body ;
        const product = new Product({name, description, price, countInStock, imageURL})
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the product to db' });
    }
}   

const updateProduct = async (req, res) =>{
    try {
        const {id} = req.params;
        const updates = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Destructure the request body for cleaner assignment
        const { name, description, price, imageURL, countInStock } = req.body;

        // Update the product with the new data
        product.name = updates.name || product.name;
        product.description = updates.description || product.description;
        product.price = updates.price || product.price;
        product.imageURL = updates.imageURL || product.imageURL;
        product.countInStock = updates.countInStock || product.countInStock;

        // Save the updated product
        await product.save();
        
        // Return the updated product
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
}

const removeCartItem = async (req, res) => {
    try {
        const {id} = req.params
        
        // const item = await Cart.findByIdAndDelete(id);
        const item = await Cart.findById(id);
        if (!item){
            return res.status(404).json({message: "Product not found for removing from cart"})
        }
        if (item.quantity > 1) {
            item.quantity -= 1;
            await item.save();
            return res.status(200).json({message: "Product quantity in Cart (-1)"})        
         }
        else{
            await Cart.deleteOne({_id: item.id});
            
            return res.status(200).json({message: "Product removed from cart successfully"})    
         }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing the product from cart" });
    }
}   
const deleteCart = async (req, res) => {
    try {
        const items = await Cart.deleteMany()
        if(!items){
            return res.status(404).json({message: "Error deleting whole cart"})
        }
        return res.status(200).json({message: "Cart deleted successfully"}) 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params
        const item = await Product.findByIdAndDelete(id);
        if (!item){
            return res.status(404).json({"message": "Product not found for removing from cart"})
        }
        res.status(200).json({"message": "Product removed from cart successfully"})    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing the product from cart" });
    }
}

// Count total cart items (sum of quantities)
const getTotalCartItems = async (req, res) => {
    try {
      // Use MongoDB aggregation to sum the quantity of all cart items
      const totalItems = await Cart.aggregate([
        {
          $group: {
            _id: null, // We don't need to group by any field
            total: { $sum: "$quantity" }, // Summing the 'quantity' field across all documents
          },
        },
      ]);
  
      // If there are no items in the cart, total will be undefined, so we return 0 in that case
      const totalCount = totalItems[0]?.total || 0;
  
      res.status(200).json({ totalCount });
    } catch (error) {
      console.error("Error in counting cart items:", error);
      res.status(500).json({ error: "Server error in counting cart items" });
    }
  };
  

module.exports = {
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
}