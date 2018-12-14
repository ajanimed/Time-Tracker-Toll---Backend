let mongoose = require('mongoose');
let Task = require("../Models/Task");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return tasks documents based on page and limit numbers
exports.list = function (req,res){
    Task.paginate({}, {populate:['category','supervisor','employee'],page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result);
        }
    });
}

//add a task to the database
exports.add = function (req,res){
    let task = new Task({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        supervisor: req.body.supervisor,
        employee: req.body.employee,
        statut: "Open"
    });
    task.save().then(
        result => {
            res.status(200).json(Object.assign(Success.message(200,"The task has been added"),{task: task}));
        }
    ).catch(err => {
            res.status(500).json(Error.message(500,err));
        }
    );
}

//find a task by id
exports.findById = function (req,res){
    Task.findOne({_id: req.params.id})
        .populate(['category','supervisor','employee'])
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//update a task by id
exports.updateById = function (req,res){
    Task.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete a task by id
exports.delete = function (req,res){
    Task.deleteOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(Success.message(200,'The task has been deleted'));
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error deleting task',err));
        })
}