let express = require("express");
let router = new express.Router();
let ScreenshotController = require("../Controllers/ScreenshotController");
let upload = require("../config/uploadStrategies/screenshot-upload");


//return a screenshots list
router.get('/screenshots/:page/:number', ScreenshotController.list);

//return a screenshots list by task
router.get('/screenshot/:page/:number/:task', ScreenshotController.findByTask);

//return one screenshot by id
router.get('/screenshot/:id', ScreenshotController.findById);

//upload a screenshot to the server
router.post('/screenshot/upload/',
           [upload.upload,
            ScreenshotController.upload]
            );

//update one screenshot by id
router.put('/screenshot/update/:id',ScreenshotController.updateById);

//delete one screenshot by id
router.delete('/screenshot/delete/:id', ScreenshotController.delete);

module.exports = router;