let User = require("../Models/User");
let Employee = require("../Models/Employee");
let Supervisor = require("../Models/Supervisor");
let Administrator = require("../Models/Administrator");
let Error = require("../Models/Error");
let Success = require("../Models/Success");

verifUserRole = function(req,res,next){
    User.findOne({email:req.body.email},(err,doc) => {
        if(doc.length===1){
           Employee.findOne({_id:doc[0]._id},(err,employee)=>{
              if(employee.length===1){
                  req.role = "employee";
              }
              else{
                  Supervisor.findOne({_id:doc[0]._id},(err,supervisor)=>{
                     if(supervisor.length===1){
                         req.role = "supervisor";
                     }
                     else{
                         req.role="administrator";
                     }
                  });
              }
           });
        }
        else{
            res.status(500).json(Error.message(500,err));
        }
        next();
    })
}

module.exports = verifUserRole;