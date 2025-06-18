const express = require("express");
const router = express.Router();
const userPanelcontroller = require("../Controllers/userPanelController");



router.get("/userPanel", userPanelcontroller.getUserPanel);

router.post("/updateProfile", userPanelcontroller.postEditProfile);

module.exports = router;
