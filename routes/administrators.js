let express = require("express");
let router = new express.Router();
let AdministratorController = require("../Controllers/AdministratorController");

//return an administrators list
router.get('/administrators/:page/:number', AdministratorController.list);

//return one administrator by id
router.get('/administrator/:id', AdministratorController.findById);

//update one administrator by id
router.put('/administrator/update/:id',AdministratorController.updateById);

//delete one administrator by id
router.delete('/administrator/delete/:id', AdministratorController.delete);

module.exports = router;