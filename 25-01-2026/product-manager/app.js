require("dotenv").config();

const express = require("express");
const app = express();

// Config
const PORT = process.env.NODE_PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/product.routes"));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
