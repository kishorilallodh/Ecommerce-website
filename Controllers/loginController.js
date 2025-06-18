
const signupModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = "yourkey"


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;


  if(email == "admin@gmail.com" && password == "admin"){

   
    
    const token1 = jwt.sign({email : "admin@gmail.com" , role : "admin"}, jwt_secret)  //get token from database
    res.cookie("token", token1,{
      httpOnly:true, 
      sameSite:"strict",
      secure:false,
    })
    // console.log(token)

    res.redirect('/adminPanel');
    
  }else{
    try {

    const existUser = await signupModel.findOne({ email });

    if (!existUser) {
      return res.send('User not found');
    }

    const hashPassword = await bcrypt.compare(password, existUser.password);

    if (!hashPassword) {
      return res.send('Invalid password');
    }

  const token = jwt.sign({email : email , id : existUser._id}, jwt_secret)  //get token from database
   res.cookie("token", token,{
    httpOnly:true, 
    sameSite:"strict",
    secure:false,
  })
  // console.log(token)

    // res.send('Login successful');

    res.redirect('/')
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
  }
  
};