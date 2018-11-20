let express = require("express");
require('dotenv').load();
let router = new express.Router();
let mongoose = require("mongoose");
let User = require("../models/User");
let jwt = require('jsonwebtoken');
let passport = require('passport');
let passwordHash = require('password-hash');
require('../Midllewears/passport');


//registration : add one user to the database
router.post('/register', (req,res) => {
    let hashedPassword = passwordHash.generate(req.body.password);
    let user = new User({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        surname:req.body.surname,
        tel:req.body.tel,
        email:req.body.email,
        password:hashedPassword,
        role:req.body.role
    });
    user.save().
    then(
        result =>{
            res.status(200).json({message:'The user has been added',user:user});
        }
    ).
    catch(err =>{
            res.status(500).json({message:'Internal Server error',error:err});
        }
    );
});

//authentification
router.post('/login',(req,res) => {
    passport.authenticate('local', {session: false}, (err, user,message, info) => {
        if (err || !user) {
            console.log(err);
            console.log(user);
            return res.status(400).json({
                message: message,
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })
    (req, res);
});



module.exports = router;
