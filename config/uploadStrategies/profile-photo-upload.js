let multer = require('multer');
let DirectoriesConfig = require('./directories-config');
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        let uploadDestination = DirectoriesConfig.createProfilePhotoUploadingDirectory(req.params.id);
        req.photoDir = uploadDestination+'/'+file.originalname;
        cb(null,uploadDestination);
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

let screenshotUpload = multer({storage:storage});

module.exports = screenshotUpload;