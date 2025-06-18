const Cart = require("../models/cart");
const userauth = require("../authentication/userauth");

// Controller to Add Product to Cart
const cartController = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  let user = null;
  const token = req.cookies.token;
  user = await userauth(token);

  let cart = await Cart.findOne({ userId });
  if (cart) {
    const item = cart.product.find((items) => items.productid == productId);

    if (item) {
      item.quantity += 1;
    } else {
      // console.log('Item not found');
      cart.product.push({ productid: productId, quantity: 1 });
    }
  } else {
    cart = new Cart({
      userId,
      product: [{ productid: productId, quantity: 1 }],
    });
  }

  await cart.save();
  const cartdata = await Cart.findOne({ userId }).populate("product.productid");
  
  res.redirect('/product/' + req.params.id);
};

const increaseQuantity = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  let cart = await Cart.findOne({ userId });
  if (cart) {
    const item = cart.product.find((items) => items.productid == productId);
    if (item) {
      item.quantity += 1;
      await cart.save();
    }
  }
  res.redirect("/cart");
};
const decreaseQuantity = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  let cart = await Cart.findOne({ userId });

  if (cart) {
    const itemIndex = cart.product.findIndex(
      (item) => item.productid == productId
    );

    if (itemIndex > -1 && cart.product[itemIndex].quantity > 1) {
      cart.product[itemIndex].quantity -= 1;
      await cart.save();
    }
  }

  res.redirect("/cart");
};

const deleteCartProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.product = cart.product.filter((item) => item.productid != productId);
    await cart.save();
  }

  res.redirect("/cart");
};



module.exports = {
  cartController,
  increaseQuantity,
  decreaseQuantity,
  deleteCartProduct,
};
