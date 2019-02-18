let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let User = require("./User");
let Task = require("./Task");

let EmployeeSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    function:{type:String,required:true}
});
EmployeeSchema.post('find',function(req,res,next){
    res.status(200).json(req.result);
    next();
});
EmployeeSchema.pre('remove',function(next){
    User.findOne({_id:this.user})
        .exec()
        .then(doc => {
            doc.remove();
        })
        .catch(err => {
            console.log(err);
        })
    try{
        Task.updateMany({"employee":this._id},
                        {employee:null}
                        );
    }
    catch(err){
        console.log(err);
    }
    next();
});


EmployeeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Employee', EmployeeSchema);
