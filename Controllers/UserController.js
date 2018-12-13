let mongoose = require('mongoose');
let User = require("../Models/User");
let Employee = require("../Models/Employee");
let Supervisor = require("../Models/Supervisor");
let Success = require("../Models/Success");
let Error = require("../Models/Error");
let passwordHash = require('password-hash');


//register one user
exports.register = function (req, res) {
    let hashedPassword = passwordHash.generate(req.body.password);
    let user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        surname: req.body.surname,
        tel: req.body.tel,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role
    });
    user.save().then(
        result => {
            if(req.body.employee){
                let employeeBody = {
                    _id: mongoose.Types.ObjectId(),
                    function: req.body.employee.function,
                    user:user._id
                };
                let employee = new Employee(employeeBody);
                employee.save((err) => {
                    if(err){
                        res.status(500).json(Error.message(500,err));
                    }
                    else{
                        res.status(200).json(Object.assign(Success.message(200,"The user has been added"),{user:user},{employee:employee}));
                    }
                });
            }
            else{
                if(req.body.supervisor){
                    let supervisorBody = {
                        _id: mongoose.Types.ObjectId(),
                        function: req.body.supervisor.function,
                        user:user._id
                    };
                    let supervisor = new Supervisor(supervisorBody)
                    supervisor.save((err) => {
                        if(err){
                            res.status(500).json(Error.message(500,err));
                        }
                        else{
                            res.status(200).json(Object.assign(Success.message(200,"The user has been added"),{user:user},{supervisor:supervisor}));
                        }
                    });
                }
            }
        }
    ).catch(err => {
            res.status(500).json(Error.message(500,err));
        }
    );
}

//change user password
exports.changePassword = function (req,res){
    User.updateOne({_id: req.params.id},{password:hashedPassword})
        .exec()
        .then(doc => {
            res.status(200).json(Success.message(200,'The password has been changed'));
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error changing password',err));
        })
}

//return documents based on page and limit numbers
exports.list = function (req, res) {
    User.paginate({}, {page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result.docs);
        }
    });
}

//find a user by id
exports.findById = function (req, res) {
    User.findOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update a user by id
exports.updateById = function (req, res) {
    User.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete a user by id
exports.delete = function (req, res) {
    User.deleteOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(Success.message(200,'The user has been deleted'));
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error deleting user',err));
        })
}
