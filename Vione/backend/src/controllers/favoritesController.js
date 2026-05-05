const favoritesService = require("../services/favoritesService");

exports.getFavorites = async (req, res) => {
  try {
    const favs = await favoritesService.getFavorites(req.params.userId);
    res.json({ success: true, favorites: favs });
  } catch (err) {
    console.error("[favoritesController] getFavorites:", err.message);
    res.status(500).json({ success: false, message: "Erro ao buscar favoritos." });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const result = await favoritesService.toggleFavorite(req.params.userId, productId);
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("[favoritesController] toggleFavorite:", err.message);
    res.status(500).json({ success: false, message: "Erro ao atualizar favorito." });
  }
};