const express = require('express');
const router = express.Router();
const adminPanelController = require('../Controllers/adminPanelController')
const authMiddleware = require('../authentication/auth');

router.get('/adminPanel', authMiddleware ,adminPanelController.getAdminPanel)
router.get('/adminProduct', authMiddleware ,adminPanelController.adminProduct)

module.exports = router