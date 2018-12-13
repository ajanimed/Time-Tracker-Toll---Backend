let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let User = require("./User");
let Task = require("./Task");

let EmployeeSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    function:{type:String,required:true}
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
        console.log(this._id+" this the employee id");
        Task.updateMany({"employee":this._id},
                        {employee:null}
                        );
        console.log('yoyo');
    }
    catch(err){
        console.log(err);
    }
    next();
});


EmployeeSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Employee', EmployeeSchema);
