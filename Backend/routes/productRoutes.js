const express = require("express");
const router = express.Router();
const fetchAdmin = require("../middleware/fetchAdmin");
const { addProduct, getAllProducts } = require("../controllers/productController");

router.post("/addproduct", fetchAdmin, addProduct);
router.get("/allproducts", getAllProducts);

module.exports = router;