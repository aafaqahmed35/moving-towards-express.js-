const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log("Always runs!!");
    next();
});

app.get('/add-product', (req, res) => {
    console.log("Currently in products page");
    res.send(
        '<form action="/product" method="POST">' +
        '<input type="text" name="title">' +
        '<button type="submit">Submit</button>' +
        '</form>'
    );
});

app.post('/product', (req, res) => {
    console.log(req.body); // { title: '...' }
    res.redirect('/');
});

app.get('/', (req, res) => {
    console.log("Currently in home page");
    res.send('<h1>HOME PAGE</h1>');
});

app.listen(3000);