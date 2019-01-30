let User = require("../Models/User");
let Error = require("../Models/Error");

Verifmail = function(req,res,next){
    if(req.body.email){
        User.find({email:req.body.email}, (err,doc) =>{
            if(err){
                res.status(500).json(Error(500,err));
            }
            else{
                if(doc.length!==0){
                    res.status(500).json(Error.message(500,"Email adress already exist"));
                }
                else{
                    next();
                }
            }
        })
    }
    else{
        if(req.params.email){
            console.log(req.params.email);
            User.find({email:req.params.email}, (err,doc) =>{
                if(err){
                    res.status(500).json(Error(500,err));
                }
                else{
                    if(doc.length!==0){
                        res.status(500).json(Error.message(500,"Email adress already exist"));
                    }
                    else{
                        res.status(200).json(Error.message(200,"Email adress dosent exist"));
                    }
                }
            })
        }
    }
}

module.exports = Verifmail;