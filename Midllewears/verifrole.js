let Employee = require("../Models/Employee");
let Supervisor = require("../Models/Supervisor");
let Administrator = require("../Models/Administrator");
let role ='fd';
Verifrole = function(user){
        Employee.findOne({user:user._id})
            .then(employee=>{
                if(employee){
                    role = 'employee';
                }
            })
            .catch(error=>{
                console.log(error);
            })
        Supervisor.findOne({user:user._id})
            .then(supervisor=>{
                if(supervisor){
                    role ='supervisor';
                }
            })
            .catch(error=>{
                console.log(error);
            })
        Administrator.findOne({user:user._id})
            .then(administrator=>{
                if(administrator){
                    role = 'administrator';
                }
            })
            .catch(error=>{
                console.log(error);
            })
    console.log(role);
    return role;
}


module.exports = Verifrole;