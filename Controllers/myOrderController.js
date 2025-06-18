const Order = require("../models/orderModel");
const userauth = require("../authentication/userauth");

const orderPage = async (req, res) => {
  const token = req.cookies.token;
  const user = await userauth(token);
  const userId = req.user.id;

  const orders = await Order.find({ userId});
  res.render("asset/myOrder", { user, orders });
};

module.exports = {
  orderPage,
};
