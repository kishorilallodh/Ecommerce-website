const Product = require("../models/productModel");
const userauth = require("../authentication/userauth");

const fs = require("fs");
const path = require("path");


const getAddProductPage = async (req, res) => {
    let user = null; 
   const token = req.cookies.token;
   user = await userauth(token);
  res.render("admin/addproduct" , {user});
};

const showAllProducts = async (req, res) => {
  let user = null; 
   const token = req.cookies.token;
   user = await userauth(token);
  
 
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;
      const skip = (page - 1) * limit;
      
      const totalProducts = await Product.countDocuments({});
      const products = await Product.find().skip(skip).limit(limit);

  res.render("asset/showProduct",
     {user,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
      totalProducts});
};

const getEditProductPage = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render("asset/editproduct", { product }); 
};

const updateProduct = async (req, res) => {
  try {
    const { pname, pprice, pdisct, pbname, pdesc, pcategory } = req.body;

    const updatedData = {
      pname,
      pprice,
      pdisct,
      pbname,
      pdesc,
      pcategory,
    };

    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      updatedData.pimage = req.files.map(file => "productimage/" + file.filename);
    }

    await Product.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect("/showProduct");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update product");
  }
};

const submitProduct = async (req, res) => {
  const { pname, pprice, pdisct, pbname, pdesc,pcategory, } = req.body;
  const pimage = req.files.map(file=> `productimage/${file.filename}`);
  
  const data = new Product({
    pname,
    pprice,
    pdisct,
    pbname,
    pdesc,
    pimage,
    pcategory,
  });

  await data.save();
  res.send("Data submitted");
};

const deleteProduct = async (req, res) => {
  // Find product first
    const product = await Product.findById(req.params.id);
   // Image file path
    const imagePath = path.join(__dirname, "../public/", product.pimage[0]);

    // Delete image from server
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Failed to delete image:", err);
      } else {
        console.log("Image deleted from server");
      }
    });
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/showProduct");
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
 
   let user = null; 
   const token = req.cookies.token;
   user = await userauth(token);
  res.render("asset/productDetails", { product, user });
};

module.exports = {
  getAddProductPage,
  submitProduct,
  showAllProducts,
  getEditProductPage,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
