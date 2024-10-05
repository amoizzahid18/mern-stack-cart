const express = require("express");    
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const PORT = process.env.PORT || 5500;
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes.js");


app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000", // Allow only your frontend
    credentials: true
  }));


app.use("/api/products", productRoutes)


connectDB().then(() => {
    
    app.listen(PORT, ()=>{
        console.log(`Server running on PORT ${PORT} `);
    })
})
