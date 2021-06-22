const router = require('express').Router();
const isLoggedIn = require('../helper/isLoggedIn')

// GET Requests --------------------------------------------

// Create Order
router.get('/create', isLoggedIn, (req, res) => {
    res.render('ticketSelect')
})
// API Routes -----------------------------------------------

// Create Order
router.post('/create/', isLoggedIn, (req, res) => {
    // Create A ticket or tickets
    // Link it or them to the current user
    // Redirect to the user orders page

    res.json({ path: '/order/create', name: 'Create New Order', body: { 'Created Order': req.body } })
})
// Modify an Order
router.post('/modify/:id', isLoggedIn, (req, res) => {

    // update ticket and save it 
    res.json({ path: '/order/modify', name: 'Modify Existing Order', body: { 'Updated Order': req.body } })
})

// Modify an Order
router.post('/delete/:id', isLoggedIn, (req, res) => {
    res.json({ path: '/order/delete', name: 'Delete Existing Order', body: { 'Deleted Order ID': req.params.id } })
})

module.exports = router;