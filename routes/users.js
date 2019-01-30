let express = require("express");
let router = new express.Router();
let UserController = require("../Controllers/UserController");
let upload = require("../config/uploadStrategies/profile-photo-upload");
let Verifmail = require("../Midllewears/verifmail");
//return a users list
router.get('/users/:page/:number', UserController.list);

//return one user by id
router.get('/user/:id', UserController.findById);

//update one user by id
router.put('/user/update/:id',UserController.updateById);

//update profile photo by id
router.put('/user/update/photo/:id',upload.single('photo'),UserController.changeProfilePhoto);

//delete one user by id
router.delete('/user/delete/:id', UserController.delete);

//verif email
router.get('/user/verifemail/:email',Verifmail);

module.exports = router;