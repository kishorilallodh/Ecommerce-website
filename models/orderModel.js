const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
    userId :String,
    orderId:String,
    username:String,
    email :String,
    paymentId:String,
    orderId:String,
    amount:Number,
    product : {
        type: Array,
        required: true
    },
    status:String,
    created:{type:Date, default:Date.now()}
})

module.exports = mongoose.model('Order',orderSchema)