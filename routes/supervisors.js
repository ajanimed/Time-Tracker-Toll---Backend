let express = require("express");
let router = new express.Router();
let SupervisorController = require("../Controllers/SupervisorController");

//return an supervisors list
router.get('/supervisors/:page/:number', SupervisorController.list);

//return one supervispr by id
router.get('/supervisor/:id', SupervisorController.findById);

//update one supervisor by id
router.put('/supervisor/update/:id',SupervisorController.updateById);

//delete one supervisor by id
router.delete('/supervisor/delete/:id', SupervisorController.delete);

module.exports = router;