const express = require('express')
const dashboardController = require("../controllers/dashboardController");

const router = express.Router()
router.get('/dashboard', dashboardController.dashboardView)

module.exports = router