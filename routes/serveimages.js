let express = require('express');
let router = new express.Router();
let config = require('config');
//let root = config.get("servingProfileImagesDirectory");
let path = require('path');
let root = path.dirname(require.main.filename);

console.log(root);
//sending profile photos
router.get('/profiles-photos/:userId/:photoName', function(req,res,next){
    //res.status(200).json({'yo':'yoyo'});
   let options = {
       root: root+'/img/profiles-photos/'+req.params.userId+'/',
       dotfiles: 'deny',
       headers: {
           'x-timestamp': Date.now(),
           'x-sent': true
       }
   };

   let fileName = req.params.photoName;
   res.sendFile(fileName, options, function (err) {
       if (err) {
           next(err);
       } else {
           console.log('Sent:', fileName);
       }
   });
});

module.exports = router;