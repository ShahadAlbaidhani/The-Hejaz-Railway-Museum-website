const router = require('express').Router();
const User = require('../models/UserModel');
const Card = require('../models/CardModel');
const methodOverride = require('method-override')
router.use(methodOverride('_method'))
// GET Requests --------------------------------------------










// API Routes -----------------------------------------------

router.post('/new', async (req, res) => {
    let newCard = new Card({ ...req.body, cardNumber: req.body.cardNumber.replace(/ /g, "") });
    newCard.user = req.user;
    await newCard.save();
    let user = await User.findById({ _id: req.user._id })
    user.card = newCard;
    await user.save();
    res.redirect('/profile')
})


router.post('/update', async (req, res) => {
    await Card.findOneAndUpdate({ user: req.user }, req.body)

    res.redirect('/profile')
})






module.exports = router;