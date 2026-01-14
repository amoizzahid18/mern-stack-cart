require("dotenv").config()
const productsData = require("./data/products")
const connectDB = require("./config/db")
const Product = require("./models/product")
const Cart = require("./models/cart")

console.log("Entering seeder script")

// establish database conn
connectDB()

const importData = async () => {
    try {
       await Cart.deleteMany()        
       await Product.deleteMany()
       console.log("Data from cart and product deleted") 

        await Product.insertMany(productsData)
        console.log("Data is imported successfully")
        process.exit()
    } catch (error) {
        console.error("Error with data import")
        process.exit(1)
    }
} 

importData();
