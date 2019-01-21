let express = require('express');
let router = new express.Router();

//sending profile photos
router.get('/profiles-photos/:userId/:photoName', function(req,res,next){
    //res.status(200).json({'yo':'yoyo'});
    console.log('im here');
   let options = {
       root: 'D:/Mohamed/Master/PFE/ttt/backend/img/profiles-photos/'+req.params.userId+'/',
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