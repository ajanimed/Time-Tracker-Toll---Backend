let express = require("express");
let router = new express.Router();
let TimeLogController = require("../Controllers/TimeLogController");

//return a timelogs list
router.get('/timelogs/:page/:number', TimeLogController.list);

//return one timelog by id
router.get('/timelog/:id', TimeLogController.findById);

//create one timelog
router.post('/timelog/create',TimeLogController.createLog);

//add one log to timelog by
router.put('/timelog/addlog/:id',TimeLogController.addLog);

//delete one timelog by id
router.delete('/timelog/delete/:id', TimeLogController.delete);

module.exports = router;