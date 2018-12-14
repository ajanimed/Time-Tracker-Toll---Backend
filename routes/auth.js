let express = require("express");
require('dotenv').load();
let router = new express.Router();
let UserController = require("../Controllers/UserController");
let jwt = require('jsonwebtoken');
let passport = require('passport');
require('../Midllewears/passport');
let Verifmail = require("../Midllewears/verifmail");
let upload = require("../config/uploadStrategies/profile-photo-upload");

//registration : add one user to the database
router.post('/register',[Verifmail,UserController.register,upload.single('photo')] );

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
