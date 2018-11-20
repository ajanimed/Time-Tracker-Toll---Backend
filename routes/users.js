let express = require("express");
let router = new express.Router();
let mongoose = require("mongoose");
let User = require("../models/User");


//return all users
router.get('/list',(req,res)=>{
    User.find()
        .exec()
        .then(docs =>{res.status(200).json(docs);
        })
        .catch(err =>{res.status(500).json({message:'Internal Server error',error:err});
        })
});


module.exports = router;