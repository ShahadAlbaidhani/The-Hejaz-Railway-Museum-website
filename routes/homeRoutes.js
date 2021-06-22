const router = require('express').Router();
const isLoggedIn = require('../helper/isLoggedIn')
const Ticket = require('../models/TicketModel')
const Order = require('../models/OrderModel')
const Card = require('../models/CardModel')
const User = require('../models/UserModel')
const methodOverride = require('method-override')
router.use(methodOverride('_method'));
// GET Requests --------------------------------------------

// Index
router.get('/', (req, res) => {
    res.render('home');
})

// Our Story
router.get('/about', (req, res) => {
    res.render('home');
})

// Visit Page
router.get('/visit', (req, res) => {
    res.render('visit')

})


// Collections Page
router.get('/explore', (req, res) => {
    res.render('explore');
})

// Collction Page
router.get('/collection/:id', (req, res) => {
    res.json({ path: `/collection/${req.params.id}`, name: 'Collection Page' })
})
// API Routes -----------------------------------------------

// NONE


router.get('/ticket', (req, res) => {
    console.log(req.query);
    res.render('ticketSelect', { queries: req.query });
})

router.get('/checkout', (req, res) => {
    res.render('checkout');
})


router.post('/checkout', async (req, res) => {


    let user = await User.findById(req.user._id);

    let newCard = new Card({
        ownerName: req.body.ownerName,
        cvv: req.body.cvv,
        cardNumber: req.body.cardNumber.replace(/ /g, ''),
        expiryDate: req.body.expiryDate

    });

    newCard.user = req.user;
    await newCard.save();
    if (req.body.savePaymentInfo != undefined || req.body.updatePaymentInfo != undefined) {
        console.log('The user wants to save the card info');
        user.card = newCard;
        await user.save();

    }



    let newOrder = new Order();
    newOrder.user = req.user;
    newOrder.card = newCard._id;

    for (let i = 0; i < req.body.adults; i++) {

        newTicket = new Ticket({
            ticketDate: new Date(req.body.ticketDate).toISOString(),
            duration: req.body.duration,
            order: newOrder._id,
            ticketType: 'Adults',
            price: 50
        });

        await newTicket.save();

        newOrder.tickets.push(newTicket)

        await newOrder.save();
    }
    for (let i = 0; i < req.body.children; i++) {
        newTicket = new Ticket({
            ticketDate: req.body.ticketDate,
            duration: req.body.duration,
            order: newOrder._id,
            ticketType: 'Children',
            price: 25
        });

        await newTicket.save();

        newOrder.tickets.push(newTicket)

        await newOrder.save();
    }
    userOrders = await Order.find({ user: req.user._id }).populate('tickets')
    res.render('orders', {checkout: true, userOrders: userOrders});
})


router.post('/ticket', isLoggedIn, async (req, res) => {
    let user = await User.findById(req.user._id).populate('card');
    res.render('checkout', { order: req.body, user: user })
})



router.get('/orders', async (req, res) => {
    userOrders = await Order.find({ user: req.user._id }).populate('tickets')
    res.render('orders', { userOrders , checkout: false});
})

router.delete("/orders/delete", async (req, res) => {
    await Ticket.deleteMany({ order: req.query.id })
    await Order.findByIdAndDelete(req.query.id)
    res.redirect("/");
})



module.exports = router;