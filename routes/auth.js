let express = require("express");
require('dotenv').load();
let router = new express.Router();
let UserController = require("../Controllers/UserController");
let jwt = require('jsonwebtoken');
let passport = require('passport');
require('../Midllewears/passport');
let Verifmail = require("../Midllewears/verifmail");
let Employee = require("../Models/Employee");
let Supervisor = require("../Models/Supervisor");
let Administrator = require("../Models/Administrator");
let upload = require("../config/uploadStrategies/profile-photo-upload");

//registration : add one user to the database
router.post('/register',[Verifmail,UserController.register,upload.single('photo')] );

//authentification
router.post('/login', (req,res) => {
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
            //-------------------ROLE DETERMINATION-------------------//
            Administrator.findOne({user:user._id})
                .then(administrator=>{
                    if(administrator){
                        let role = 'administrator';
                        let id = administrator._id;
                        res.sendFile(__dirname+user.photo);
                        return res.json({user, role, id, token});
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            Employee.findOne({user:user._id})
                .then(employee=>{
                    if(employee){
                        let role = 'employee';
                        let id = employee._id;
                        res.sendFile(__dirname+user.photo);
                        return res.json({user, role, id, token});
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            Supervisor.findOne({user:user._id})
                .then(supervisor=>{
                    if(supervisor){
                        let role = 'supervisor';
                        let id = supervisor._id;
                        res.sendFile(__dirname+user.photo);
                        return res.json({user, role, id, token});
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
            //-----------------END OF ROLE DETERMINATION-------------------//
        });
    }, )
    (req, res);
}
);

module.exports = router;
