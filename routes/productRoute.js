const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const authMiddleware = require('../authentication/auth'); 
const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: "public/productimage",
 filename:(req,file,tempname)=>{
        const oldname = path.extname(file.originalname)
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${oldname}`;
        tempname(null,uniqueName)
    },
});
const upload = multer({ storage: storage });

// Routes

router.get("/addproduct",authMiddleware, productController.getAddProductPage);
router.post('/submitproduct', upload.single('pimage'), productController.submitProduct)
router.get("/showproduct",authMiddleware, productController.showAllProducts);

router.get('/editproduct/:id',authMiddleware,productController.getEditProductPage);
router.post('/editproduct/:id', upload.single('pimage'), productController.updateProduct);

router.get('/deleteproduct/:id', productController.deleteProduct);

router.get('/product/:id',authMiddleware, productController.getSingleProduct);




module.exports = router;
