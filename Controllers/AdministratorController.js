let Administrator = require("../Models/Administrator");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return administrators documents based on page and limit numbers
exports.list = function (req,res){
    Administrator.paginate({}, {populate:'user',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result);
        }
    });
}

//find an administrator by id
exports.findById = function (req,res){
    Administrator.findOne({_id: req.params.id})
        .populate('user')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update an administrator by id
exports.updateById = function (req,res){
    Administrator.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete an administrator by id
exports.delete = function (req,res){
    Administrator.findOne({_id: req.params.id}, function (err, administrator) {
        if (err) {
            res.status(500).json(Error.message(500,'Error deleting administrator',err));
        }
        else{
            administrator.remove(function (err) {
                if(err){
                    res.status(500).json(Error.message(500,'Error deleting administrator',err));
                }
                else{
                    res.status(200).json(Success.message(200,'The administrator has been deleted'));
                }
            });
        }
    });
}