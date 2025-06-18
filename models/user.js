const mongoose = require('mongoose')


const Schema = mongoose.Schema
const signupSchema = new Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    gender: String,
    token:String,
    type : String
})
const signupModel = mongoose.model('signup', signupSchema)
module.exports = signupModel