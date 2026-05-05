const cartService = require("../services/cartService");

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.params.userId);
    res.json({ success: true, cart: cart || { items: [] } });
  } catch (err) {
    console.error("[cartController] getCart:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar carrinho." });
  }
};

exports.addItem = async (req, res) => {
  try {
    console.log(">>> req.userId:", req.userId);        // ← adicione
    console.log(">>> req.headers:", req.headers.authorization); // ← adicion
    const { productId, size, qty } = req.body;
    const item = await cartService.addItem(req.params.userId, productId, size, qty);
    res.json({ success: true, item });
  } catch (err) {
    console.error("[cartController] addItem:", err.message);
    res.status(500).json({ success: false, message: "Erro ao adicionar item." });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { itemId, qty } = req.body;
    const item = await cartService.updateItem(itemId, qty);
    res.json({ success: true, item });
  } catch (err) {
    console.error("[cartController] updateItem:", err.message);
    res.status(500).json({ success: false, message: "Erro ao atualizar item." });
  }
};

exports.removeItem = async (req, res) => {
  try {
    await cartService.removeItem(req.body.itemId);
    res.json({ success: true });
  } catch (err) {
    console.error("[cartController] removeItem:", err.message);
    res.status(500).json({ success: false, message: "Erro ao remover item." });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await cartService.clearCart(req.params.userId);
    res.json({ success: true });
  } catch (err) {
    console.error("[cartController] clearCart:", err.message);
    res.status(500).json({ success: false, message: "Erro ao limpar carrinho." });
  }
};