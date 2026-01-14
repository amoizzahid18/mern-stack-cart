require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Mongo DB successfully");
  } catch (error) {
    console.error("Mongo DB connection failed");
    process.exit(1);
  }
};
module.exports = connectDB;
