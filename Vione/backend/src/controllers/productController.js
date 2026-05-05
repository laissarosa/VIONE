/**
 * productController.js — agora com await (service é async)
 */
const productService = require("../services/productService");

exports.getAll = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.json({ success: true, products });
  } catch (err) {
    console.error("[productController] getAll:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar produtos." });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const products = await productService.getByCategory(req.params.category);
    res.json({ success: true, products });
  } catch (err) {
    console.error("[productController] getByCategory:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar categoria." });
  }
};

exports.getBySubcategory = async (req, res) => {
  try {
    const products = await productService.getBySubcategory(
      req.params.category,
      req.params.subcategory
    );
    res.json({ success: true, products });
  } catch (err) {
    console.error("[productController] getBySubcategory:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar subcategoria." });
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Produto não encontrado." });
    }
    res.json({ success: true, product });
  } catch (err) {
    console.error("[productController] getById:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar produto." });
  }
};