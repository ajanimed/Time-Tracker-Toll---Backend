let mongoose = require('mongoose');
let TaskCategory = require("../Models/TaskCategory");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return task categories documents based on page and limit numbers
exports.list = function (req,res){
    TaskCategory.paginate({}, {page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result.docs);
        }
    });
}

//add an task category to the database
exports.add = function (req,res){
    let taskcategory = new TaskCategory({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name
    });
    taskcategory.save().then(
        result => {
            res.status(200).json(Object.assign(Success.message(200,"The task category has been added"),{taskcategory: taskcategory}));
        }
    ).catch(err => {
            res.status(500).json(Error.message(500,err));
        }
    );
}

//find an task category to the database by id
exports.findById = function (req,res){
    TaskCategory.findOne({_id: req.params.id})
        .populate('user')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update a task category
exports.updateById = function (req,res){
    TaskCategory.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete a taskcategory
exports.delete = function (req,res){
    TaskCategory.deleteOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(Success.message(200,'The task category has been deleted'));
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error deleting the task category',err));
        })
}