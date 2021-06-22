// Environment Variables
require('dotenv').config()
var datetime = require('node-datetime');
const PORT = process.env.PORT || 4000;


// Require Packages
const express = require('express')
const ejsLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const path = require('path');


const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const homeRoutes = require('./routes/homeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const cardRoutes = require('./routes/cardRoutes')

const session = require('express-session');
const passport = require('./helper/ppConf');

const flash = require('req-flash');


// Express App
const app = express();
app.set('view engine', 'ejs')
app.use(ejsLayout)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


// Mongoose Database
mongoose.connect(process.env.mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log(`MongoDB is connected!`)
})




// Express Passport and Express Session
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 3600000 }
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
})



// Connect flash
app.use(flash())



// Routes
app.use('/', homeRoutes);
app.use('/admin', adminRoutes);
app.use('/', userRoutes);
app.use('/order', orderRoutes);
app.use('/card', cardRoutes);


// Run Express Server 
app.listen(PORT, () => console.log(`The server is running on http://localhost:${PORT}`))