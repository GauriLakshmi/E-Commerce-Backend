const Product = require("../models/Product");

// GET /products - everyone can view
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /products - admin only
const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const { name, description, price, quantity } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      quantity,
      createdBy: req.user.id,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// PUT /products/:id - admin only
const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /products/:id - admin only
const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Access denied" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };