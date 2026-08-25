const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      quantity: req.body.quantity,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.new_price = {};
      if (minPrice) filter.new_price.$gte = Number(minPrice);
      if (maxPrice) filter.new_price.$lte = Number(maxPrice);
    }

    let products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    product.name = req.body.name;
    product.category = req.body.category;
    product.image = req.body.image;
    product.new_price = req.body.new_price;
    product.old_price = req.body.old_price;
    product.quantity = req.body.quantity;
    product.available = req.body.quantity > 0;

    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });

    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };