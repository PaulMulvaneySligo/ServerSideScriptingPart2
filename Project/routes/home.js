const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {

    var message = "";
     
    if (req.signedCookies.tracking){
        var message = "Welcome Back To De'Villes";
    }
    else
    {
        message = "Welcome To De'Villes";
    }

    var currentDate = new Date();
    res.cookie('tracking',currentDate.toDateString(), {signed : true});

    res.render('home', {'message': message});

});


router.get('/about',  (req, res) => {
    res.render('about');
});

module.exports = router;