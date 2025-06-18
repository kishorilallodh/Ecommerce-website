const authMiddleware = require('../authentication/auth'); 
const express = require('express')
const router = express.Router()
const Cart = require('../Controllers/cartController')
const showCartPage = require('../Controllers/cartPage')
// const { route } = require('./signuproutes')

router.get('/cart/:id', authMiddleware, Cart.cartController)
router.get('/cart',authMiddleware, showCartPage.cartpage)

router.get('/cart/increase/:id', authMiddleware, Cart.increaseQuantity)
router.get('/cart/decrease/:id', authMiddleware, Cart.decreaseQuantity)

router.post('/deleteCartproduct/:id',authMiddleware, Cart.deleteCartProduct);

module.exports = router