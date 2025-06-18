const userauth = require("../authentication/userauth");
const User = require("../models/user");


const postEditProfile = async (req, res) => {
  const { name, email, mobile, gender } = req.body;
  const token = req.cookies.token;
  const user = await userauth(token);

  if (!user) return res.redirect("/login");

  try {
    await User.findByIdAndUpdate(user._id, {
      name,
      email,
      mobile,
      gender,
    });

    res.redirect("/userPanel");
  } catch (err) {
    res.status(500).send("Error updating profile");
  }
};


const getUserPanel = async (req, res) => {
  const token = req.cookies.token;
  const user = await userauth(token);

  res.render("user/userPanel", { user });

};

module.exports = { 
  getUserPanel,
  postEditProfile,
 };