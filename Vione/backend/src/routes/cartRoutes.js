const express    = require("express");
const router     = express.Router();
const ctrl       = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Todas as rotas de carrinho exigem token válido
router.use(authMiddleware);

router.get   ("/:userId",        ctrl.getCart);
router.post  ("/:userId/add",    ctrl.addItem);
router.put   ("/:userId/update", ctrl.updateItem);
router.delete("/:userId/remove", ctrl.removeItem);
router.delete("/:userId/clear",  ctrl.clearCart);

module.exports = router;