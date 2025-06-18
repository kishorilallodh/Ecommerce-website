const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const homePageRoutes = require('./routes/homePageRoute')
const productRoutes = require('./routes/productRoute')
const signupRoutes = require('./routes/signupRoute');
const loginRoutes = require('./routes/loginRoute');
const cookieParser = require('cookie-parser');
const cartRoutes = require('./routes/cartRoute');
const checkout = require('./routes/paymentRoute')
const myOrderRoutes = require('./routes/myOrderRoute')
const userPanelRoutes = require('./routes/userPanelRoute')
const adminPanelRoutes = require('./routes/adminPanelRoute')
require('dotenv').config()

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(cookieParser());
app.use(express.json()); 


//mongodb connection
mongoose.connect('mongodb://localhost:27017/business')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err))

app.use('/', homePageRoutes);

app.use('/', productRoutes);

app.use('/', cartRoutes);

app.use('/', signupRoutes); 

app.use('/login', loginRoutes);

app.use('/', checkout);

app.use('/', myOrderRoutes);

app.use('/', userPanelRoutes);

app.use('/', adminPanelRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})