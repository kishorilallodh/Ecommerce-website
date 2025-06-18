const Product = require("../models/productModel");
const userauth = require("../authentication/userauth");
const getHomePage = async (req, res) => {
 try{
   let user = null; 
   const token = req.cookies.token;
   user = await userauth(token);

const { category, price } = req.query;
    let filter = {};

    if (category) {
      filter.pcategory = category;
    }

    if (price) {
      if (price === '5000') {
        filter.pprice = { $gt: 5000 };
      } else {
        const [min, max] = price.split('-').map(Number);
        filter.pprice = { $gte: min, $lte: max };
      }
    }

    const products = await Product.find();
  res.render("asset/index",{user , products});
 }catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
        getHomePage
};