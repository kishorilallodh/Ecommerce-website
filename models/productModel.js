const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    pname: String,
    pprice: Number,
    pdisct: String,
    pbname: String,
    pdesc: String,
    pimage: [String],
    pcategory: String,
})

module.exports = mongoose.model('Product', productSchema)