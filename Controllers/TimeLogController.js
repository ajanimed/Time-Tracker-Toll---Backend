let mongoose = require('mongoose');
let TimeLog = require("../Models/TimeLog");
let Success = require("../Models/Success");
let Error = require("../Models/Error");

//return timelogs documents based on page and limit numbers
exports.list = function (req,res){
    TimeLog.paginate({}, {populate:'task',page: req.params.page, limit: parseInt(req.params.number)}, (err, result) => {
        if (err) {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        }
        else {
            res.status(200).json(result);
        }
    });
}

//find a timelog by id task
exports.findById = function (req,res){
    TimeLog.findOne({task: req.params.id})
        .populate('task')
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json(Error.message(500,'Error fetching data',err));
        })
}
//create a timelog
exports.createLog = function(req,res){
    let playload = {
      _id: mongoose.Types.ObjectId(),
      task: req.body.task,
    };
    let timeLog = new TimeLog(playload);
    timeLog.save()
        .then(result=>{
            res.status(200).json(Success.message(200,"TimeLog has been created"));
        })
        .catch(err=>{
            res.status(500).json(Error.message(500,err));
        })
}
//add a log to the timelog by id task
exports.addLog = function(req,res){
    let Log = req.body;
    let date = new Date();
    TimeLog.findOne({task:req.params.id},function (err,timelog){
        console.log(timelog);
       if(err){
           res.status(500).json(Error.message(500,err));
       }
       else{
           timelog.Logs.set(date.toString(),Log);
           timelog.save()
               .then(result=>{
                   res.status(200).json(Success.message(200,"Success adding Log"));
               })
               .catch(err=>{
                   res.status(500).json(Error.message(500,err));
               })
       }
    });
}

//delete a timelog by id
exports.delete = function (req,res){
    TimeLog.findOne({_id: req.params.id}, function (err, timelog) {
        if (err) {
            res.status(500).json(Error.message(500,'Error deleting timelog',err));
        }
        else{
            timelog.remove(function (err) {
                if(err){
                    res.status(500).json(Error.message(500,'Error deleting timelog',err));
                }
                else{
                    res.status(200).json(Success.message(200,'The timelog has been deleted'));
                }
            });
        }
    });
}