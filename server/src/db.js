const mongoose = require("mongoose");

//Function that handles the connection to MongoDB Atlas
async function connectToDatabase() {
  console.log("Connect to DB & start server");
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: "Database",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Unable to connect to the database");
  }
}

module.exports = { connectToDatabase };
