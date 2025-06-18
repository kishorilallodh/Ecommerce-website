const Cart = require("../models/cart");
const userauth = require("../authentication/userauth");

const cartpage = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user = await userauth(token);
    const userId = req.user.id;

    let cartdata = await Cart.findOne({ userId }).populate("product.productid");

    if (!cartdata) {
      cartdata = { product: [] }; // 👈 default empty cart object
    }

    let total = 0;
    let discount = 0;

    cartdata.product.forEach(item => {
      if (item.productid) {
        total += item.productid.pprice * item.quantity;
        discount += (item.productid.pprice * item.productid.pdisct * item.quantity) / 100;
      }
    });

    res.render("asset/cart", { cartdata, total, discount, user });
  } catch (err) {
    console.error("cartpage error:", err);
    res.render("asset/cart", {
      cartdata: { product: [] },
      total: 0,
      discount: 0,
      user: null,
    });
  }
};

module.exports = {cartpage};