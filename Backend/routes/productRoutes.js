const express = require("express");
const router = express.Router();
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/productController");
const { validateAddProduct, validateUpdateProduct } = require("../validators/productValidator");
const fetchAdmin = require("../middleware/fetchAdmin.js")

router.post("/addproduct", fetchAdmin, validateAddProduct, addProduct);
router.get("/allproducts", getAllProducts);
router.put("/admin/products/:id", fetchAdmin, validateUpdateProduct, updateProduct);
router.delete("/admin/products/:id", fetchAdmin, deleteProduct);

module.exports = router;