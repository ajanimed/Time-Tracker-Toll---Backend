let Employee = require("../Models/Employee");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return employees documents based on page and limit numbers
exports.list = function (req,res){
    Employee.paginate({}, {populate:'user',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result);
        }
    });
}

//find an employee by id
exports.findById = function (req,res){
    Employee.findOne({_id: req.params.id})
        .populate('user')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update an employee by id
exports.updateById = function (req,res){
    Employee.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete an employee by id
exports.delete = function (req,res){
    Employee.findOne({_id: req.params.id}, function (err, employee) {
        if (err) {
            res.status(500).json(Error.message(500,'Error deleting employee',err));
        }
        else{
            employee.remove(function (err) {
                if(err){
                    res.status(500).json(Error.message(500,'Error deleting employee',err));
                }
                else{
                    res.status(200).json(Success.message(200,'The employee has been deleted'));
                }
            });
        }
    });
}