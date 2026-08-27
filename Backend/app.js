const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

app.use("/", productRoutes);
app.use("/", userRoutes);
app.use("/", cartRoutes);
app.use("/", orderRoutes);
app.use("/", adminRoutes);
app.use("/", uploadRoutes);
app.use("/", wishlistRoutes);
app.use("/", reviewRoutes);


module.exports = app;
