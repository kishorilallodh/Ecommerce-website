const express = require('express');
const router = express.Router();
const signupController = require('../Controllers/signupController');


router.get('/signup',(req , res)=>{
    res.render('asset/signup')
})
router.post('/signup', signupController.signupUser)

module.exports = router