let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
/*let Log = mongoose.Schema({
    timeCounter:{type:Date,default:Date.now},
    isActive:{type:Boolean,required:true},
    openedWindow:{type:String,required:true}
});*/



let SuspendingDate = mongoose.Schema({
   date:{type:Date,required:true},
   cause:{type:String,required:true}
});

let TimeLogSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    task:{type:mongoose.Schema.Types.ObjectId,ref:'Task',required: true},
    startDate:{type:Date,default:Date.now},
    finishDate:{type:Date},
    suspendingDates:{type:[SuspendingDate],default:[]},
    Logs:{type:Map,of:Object,default:{}}
});




TimeLogSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('TimeLog', TimeLogSchema);
