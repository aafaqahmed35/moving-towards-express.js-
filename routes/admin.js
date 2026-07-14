const express=require('express');


const path = require('path');

const rootDir = require('../util/path');

const router=express.Router();

//array to store added products

const products=[];


//get request
router.get('/add-product', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});



//post request
router.post('/add-product', (req, res) => {
    products.push({title: req.body.title}); // { title: '...' }
    res.redirect('/');
});

exports.routes=router;
exports.products=products;