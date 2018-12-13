let express = require("express");
let router = new express.Router();
let EmployeeController = require("../Controllers/EmployeeController");

//return an employees list
router.get('/employees/:page/:number', EmployeeController.list);

//return one employee by id
router.get('/employee/:id', EmployeeController.findById);

//update one employee by id
router.put('/employee/update/:id',EmployeeController.updateById);

//delete one employee by id
router.delete('/employee/delete/:id', EmployeeController.delete);

module.exports = router;