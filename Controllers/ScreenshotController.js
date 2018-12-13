let mongoose = require('mongoose');
let Screenshot = require("../Models/Screenshot");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return screenshots documents based on page and limit numbers
exports.list = function (req,res){
    Screenshot.paginate({}, {populate:'user',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result.docs);
        }
    });
}
//find a screenshot by id
exports.findById = function (req,res){
    Screenshot.findOne({_id: req.params.id})
        .populate('task')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}

//find screenshots by task
exports.findByTask = function (req,res){
    Screenshot.paginate(Screenshot.find({task:req.params.task}), {populate:'task',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result.docs);
        }
    });
}

//upload a screenshot to the server
exports.upload = function (req,res){
    let screenshot = new Screenshot({
        _id: mongoose.Types.ObjectId(),
        name: req.file.originalname,
        link:req.taskDir+'/'+req.file.originalname,
        task: req.body.task
    });
    screenshot.save().then(
        result => {
            res.status(200).json(Object.assign(Success.message(200,"The screenshot has been uploaded"),{screenshot: screenshot}));
        }
    ).catch(err => {
            res.status(500).json(Error.message(500,err));
        }
    );
}



//update a screenshot by id
exports.updateById = function (req,res){
    Screenshot.updateOne({_id: req.params.id}, req.body)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error updating user',err));
        })
}

//delete a screenshot
exports.delete = function (req,res){
    Screenshot.deleteOne({_id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json(Success.message(200,'The screenshot has been deleted'));
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error deleting screenshot',err));
        })
}