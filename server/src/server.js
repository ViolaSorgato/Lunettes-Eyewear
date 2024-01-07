const mongoose = require("mongoose");
const { app } = require("./app");
const dotenv = require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  console.log("Connect to DB & start server");

  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
      dbName: "Database",
    });

    console.log("Connected to MongoDB");

    app.listen(process.env.PORT || 3001, () =>
      console.log("Server is running on http://localhost:3000")
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
