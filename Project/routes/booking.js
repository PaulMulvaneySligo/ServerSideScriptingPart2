const express = require('express');
const { readBooking , createBooking, deleteBooking, updateBooking }= require('../models/booking.js');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('booking')
});

router.post('/', async (req, res) => {

    await createBooking(req.body);   

    req.session.flash = 
    { type: 'success', intro: 'Your Table Is Booked:', message:  "Table for <strong>" + req.body.name + "</strong> has been booked"}
    
    res.redirect(303, '/booking/booked')
})

router.get('/booked', async (req, res) => {

    if (req.session.bookingdata) {
        var newBooking = req.session.bookingdata;
    }
    else {
        var newBooking = "No Sucess";
    }

    const booking = await readBooking();

    res.render('booked', {booking: booking ,newBooking : newBooking})
});

router.get('/admin', async (req, res) => {

    const booking = await readBooking();

    res.render('admin', { booking: booking})
})

router.get('/admin/delete/:name', async (req, res) => {

    var id = req.params.name;

    await deleteBooking(id);

    res.redirect(303, '/booking/admin');

}); 


router.get('/admin/edit/:name', async (req, res) => {

    var booking = req.params.name;

    const book = await readBooking({'booking': booking})

    if (!book) {
        console.log('404 because booking doesn\'t exist');
        res.render('404');
    }
    else {
        console.log(book);
        res.render('bookingeditform', { book: book });
    }
})

router.post('/admin/edit/:name', async (req,res) =>{

    await updateBooking(req.body);

    res.redirect(303, '/booking/admin');
})

module.exports = router;