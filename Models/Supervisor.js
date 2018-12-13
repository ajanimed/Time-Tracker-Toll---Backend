let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let User = require("./User");
let Task = require("./Task");
let SupervisorSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    function:{type:String,required:true}
});

SupervisorSchema.pre('remove',function(next){
    User.findOne({_id:this.user})
        .exec()
        .then(doc => {
            doc.remove();
        })
        .catch(err => {
            //nothing to do
        })
    Task.find({supervisor:this._id})
        .exec()
        .then(doc => {
            doc.update({supervisor:null,statut:"No more supervisor assigned to this task"});
        })
    //User.deleteOne({_id:this.user}).exec();
    next();
});

SupervisorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Supervisor', SupervisorSchema);
