const express=require('express');

const app= express();

app.use('/products', (req,res,next)=>{
    console.log("Currently in products page");
    res.send('<html><b><h1>PRODUCTS PAGE</h1></b></html>');
});

app.use('/', (req,res,next)=>{
    console.log("Currently in home page");
    res.send('<html><b><h1>HOME PAGE</h1></b></html>');
});



app.listen(3000);