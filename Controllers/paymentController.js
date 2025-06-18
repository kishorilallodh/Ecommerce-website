const Razorpay = require('razorpay');
const orderSchema = require('../models/orderModel');
const Cart = require('../models/cart');

const razorpay = new Razorpay({
  key_id: 'rzp_test_q58snxSC17DiYZ',
  key_secret: 'dgvw3h33iaDDFgnXpx4idUqO'
});

const createOrder = async (req, res) => {
  try {
    

    const { totalAmount } = req.body;
    const options = {
      amount: Math.round(totalAmount * 100), // amount in smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_" + Date.now() 
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("❌ createOrder error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const saveOrder = async (req, res) => {
  try {
    const userId = req.user.id;     
    const username = req.user.name;
    const userEmail = req.user.email;
    const { razorpay_order_id, razorpay_payment_id,  totalAmount } = req.body;

    const cart = await Cart.findOne({ userId }).populate("product.productid");
    const product = cart.product;
    const productDetail = product
  .filter(item => item.productid) // avoid null entries
  .map((item) => ({
    productId: {
      id: item.productid._id,
      pname: item.productid.pname,
      pbname: item.productid.pbname,
      pprice: item.productid.pprice,
      pdisct: item.productid.pdisct,
      pimage: item.productid.pimage
    },
    quantity: item.quantity
  }));
    const order = new orderSchema({
      userId        :    userId,
      email         :    userEmail,
      orderId       :    razorpay_order_id,
      paymentId     :    razorpay_payment_id,
      username      :    username,
      product       :    productDetail,
      status        :    "paid",
      amount        :    totalAmount
    });

    await order.save();

    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Payment successful and order saved." });
  } catch (error) {
    console.error("❌ saveOrder error:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
};

module.exports = {
  createOrder,
  saveOrder
};
