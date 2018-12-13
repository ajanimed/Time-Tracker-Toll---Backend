let express = require("express");
let router = new express.Router();
let UserController = require("../Controllers/UserController");

//return a users list
router.get('/users/:page/:number', UserController.list);

//return one user by id
router.get('/user/:id', UserController.findById);

//update one user by id
router.put('/user/update/:id',UserController.updateById);

//delete one user by id
router.delete('/user/delete/:id', UserController.delete);

module.exports = router;