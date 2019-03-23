let DirectoriesConfig = require('./directories-config');
let fs=require('fs');
exports.upload = function (req,res,next){
    let uploadDestination = DirectoriesConfig.createTaskScreenshotsUploadingDirectory(req.body.task);
    let obj = req.body.file.content;
    let base64Data = obj.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(uploadDestination+'/screenshot-'+req.body.createdDate+'.png', obj,'base64',(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('one screenshot has been saved');
        }
    });
    req.taskDir = uploadDestination;
   next();
}
