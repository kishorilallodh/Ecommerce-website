const productModel = require("../models/productModel");
const userModel = require("../models/user");
const oderModel = require("../models/orderModel");

const getAdminPanel = async (req, res) => {
  try {
     if(req.user.role !== "admin"){
      return res.send('Access denied');
    }
    const totalProducts = await productModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await oderModel.countDocuments();
    res.render('admin/adminPanel',
      {
        totalProducts,
        totalUsers,
        totalOrders
      }
    );
  } catch (error) {
    res.status(500).send("Error loading products");
  }
};


const adminProduct = async (req, res) => {
  try {
     if(req.user.role !== "admin"){
      return res.send('Access denied');
    }
   
    const products = await productModel.find();
    res.render('admin/adminProduct', { products });
  
  } catch (error) {
    res.status(500).send("Error loading products");
  }

}

module.exports = {
  getAdminPanel,
  adminProduct
};