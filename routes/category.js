const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();
router.get("/categorias", categoryController.categoryView);
router.post("/categorias", categoryController.registerCategory);
router.post('/categorias/:id/edit', categoryController.editCategory)
router.post('/categorias/:id/delete', categoryController.deleteCategory)

module.exports = router;
