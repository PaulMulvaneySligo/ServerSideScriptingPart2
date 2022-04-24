const express = require('express');
const { readMenu } = require('../models/menu');
const router = express.Router();


router.get('/lunch', async (req, res) => {

        const menu = await readMenu();
    
        res.render('meal', { meal: menu[0]})
        console.log(menu[0])
})

router.get('/dinner', async (req, res) => {

        const menu = await readMenu();

        res.render('meal', { meal: menu[1]})
        console.log(menu[1])
})

router.get('/desert', async (req, res) => {

        const menu = await readMenu();

        res.render('meal', { meal: menu[2]})
        console.log(menu[2])
})

router.get('/', async (req, res) => {

        const menu = await readMenu();

        res.render('menu', { menu: menu})
})

module.exports = router;