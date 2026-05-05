const express        = require("express");
const router         = express.Router();
const ctrl           = require("../controllers/favoritesController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get ("/:userId",        ctrl.getFavorites);
router.post("/:userId/toggle", ctrl.toggleFavorite);

module.exports = router;