let User = require("../Models/User");
let Error = require("../Models/Error");

Verifmail = function(req,res,next){
    User.find({email:req.body.email}, (err,doc) =>{
        if(err){
            res.status(500).json(Error(500,err));
        }
        else{
            if(doc.length!==0){
                res.status(200).json(Error.message(200,"Email adress already exist"));
            }
            else{
                next();
            }
        }
    })
}

module.exports = Verifmail;