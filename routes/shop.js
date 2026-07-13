const express=require('express');
const router=express.Router();


router.get('/', (req, res) => {
    console.log("Currently in home page");
    res.send('<h1>HOME PAGE</h1>');
});

module.exports=router;