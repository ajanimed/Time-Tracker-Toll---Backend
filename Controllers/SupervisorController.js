let Supervisor = require("../Models/Supervisor");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return supervisors documents based on page and limit numbers
exports.list = function (req,res){
    Supervisor.paginate({}, {populate:'user',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result.docs);
        }
    });
}

//find a supervisor in the database by id
exports.findById = function (req,res){
    Supervisor.findOne({_id: req.params.id})
        .populate('user')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update a supervisor by id
exports.updateById = function (req,res){
    Supervisor.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete a supervisor by id
exports.delete = function (req,res){
    Supervisor.findOne({_id: req.params.id}, function (err, supervisor) {
        if (err) {
            res.status(500).json(Error.message(500,'Error deleting supervisor',err));
        }
        else{
            supervisor.remove(function (err) {
                if(err){
                    res.status(500).json(Error.message(500,'Error deleting supervisor',err));
                }
                else{
                    res.status(200).json(Success.message(200,'The supervisor has been deleted'));
                }
            });
        }
    });
}