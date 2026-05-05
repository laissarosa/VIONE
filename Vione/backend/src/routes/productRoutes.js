const express = require("express");
const router  = express.Router();
const ctrl    = require("../controllers/productController");

// ⚠️ Rota específica ANTES das rotas com parâmetros genéricos
router.get("/item/:id",                 ctrl.getById);
router.get("/",                         ctrl.getAll);
router.get("/:category",                ctrl.getByCategory);
router.get("/:category/:subcategory",   ctrl.getBySubcategory);

module.exports = router;