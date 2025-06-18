const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const jwt_secret = "yourkey";

const userauth = async(token) => {
    
    try {
        if(!token) return null;
      const decoded = jwt.verify(token, jwt_secret);
      const user = await userModel.findById(decoded.id);
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

module.exports = userauth;