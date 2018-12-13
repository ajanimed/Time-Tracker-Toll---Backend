let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let TaskSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required:true},
    name:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'TaskCategory',required:true},
    supervisor:{type:mongoose.Schema.Types.ObjectId,ref:'Supervisor',required:true},
    employee:{type:mongoose.Schema.Types.ObjectId,ref:'Employee',required:true},
    statut:{type:String,required:true},
    note:{type:String,required:false},
    created_at:{type:Date,default: Date.now }
});
TaskSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Task', TaskSchema);