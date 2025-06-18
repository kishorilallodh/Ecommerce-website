const express = require('express')
const router = express.Router()
const authMiddleware = require('../authentication/auth'); 
const myOrderController = require('../Controllers/myOrderController')

router.get('/myOrder',authMiddleware, myOrderController.orderPage)

module.exports = router