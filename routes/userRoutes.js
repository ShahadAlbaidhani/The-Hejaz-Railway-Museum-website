const router = require('express').Router();
const passport = require("../helper/ppConf");
const User = require('../models/UserModel');
const isLoggedIn = require('../helper/isLoggedIn')
const bcrypt = require('bcrypt')
const salt = 10;

// GET Requests --------------------------------------------

// Login
router.get('/login', (req, res) => {
    if (!req.user) {
        res.render('login')
    } else {
        res.redirect('/')
    }
})

// Signup
router.get('/signup', (req, res) => {
    if (!req.user) {
        res.render('signup', { errors: null, messages: req.flash() })
    } else {
        res.redirect('/')
    }
})

// Login
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})


// TODO Forget Password





// Profile
router.get('/profile', isLoggedIn, async (req, res) => {
    let user = await User.findOne({ _id: req.user._id }).populate('card')
    res.render('profile', { user, messages: req.flash() })
})

// Orders
router.get('/orders', isLoggedIn, (req, res) => {
    res.json({ path: '/orders', name: 'Orders Page' })
})




// API Routes -----------------------------------------------




// TODO Forget Password


// Login
router.post('/login', (req, res) => {
    passport.authenticate('local', {
        successReturnToOrRedirect: 'back',
        failureRedirect: 'back'
    })(req, res)
})
// Signup
router.post('/signup', (req, res) => {

    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, salt);
    newUser.save()
        .then((user) => {
            passport.authenticate('local', {
                successReturnToOrRedirect: 'back',
                failureRedirect: '/signup',
                failureFlash: 'Sorry, there are some errors.'
            })(req, res)
        }).catch(err => {
            console.log(err)
            res.render('signup', { errors: err.errors, oldBody: req.body })
        })
})
// Logout
router.post('/logout', (req, res) => {
    req.logout();
})


// Edit Profile
router.post('/user/password/change', async (req, res) => {

    let user = await User.findById({ _id: req.user._id })
    let status = user.changePassword(req.body.oldPassword, req.body.newPassword);

    if (status == 1) {
        req.flash('changePasswordSuccess', 'Your password has been changed!');
    } else {
        req.flash('changePasswordFail', 'Please make sure you entered the old password correctly!!');
    }

    await user.save();

    res.redirect('/profile')
})

// Edit Profile (First, last Name, email address & phone)
router.put('/user/information/change', async (req, res) => {

    User.findByIdAndUpdate(req.query.id, req.body)
        .then(() => {
            res.redirect("/profile");
        })
        .catch((err) => {
            console.log(err);
        })
})


module.exports = router;