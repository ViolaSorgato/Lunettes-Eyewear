require("dotenv").config();
const { app } = require("./app");
const { connectToDatabase } = require("./db");

//Function that handles the server
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(process.env.PORT || 3001, () =>
      console.log("Server is up and running on http://localhost:3000")
    );
  } catch (error) {
    console.error("Server startup failed:", error);
  }
}

startServer();
