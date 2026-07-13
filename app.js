const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req,res)=>{
    res.status(404).send('<html><h1>RESOURCE NOT FOUND!!!</h1></html>');
});


app.listen(3000);
