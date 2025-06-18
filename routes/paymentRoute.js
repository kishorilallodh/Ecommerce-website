
const express = require('express')
const router = express.Router()
const authMiddleware = require('../authentication/auth'); 
const paymentController = require('../Controllers/paymentController')


router.post('/createOrder', authMiddleware, paymentController.createOrder)
router.post('/saveOrder',authMiddleware, paymentController.saveOrder)
router.get('/thankyou', async (req,res)=>{res.send("payment done and cart cleared")})
module.exports = router