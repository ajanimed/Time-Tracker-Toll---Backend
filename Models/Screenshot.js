let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');


let ScreenshotSchema = mongoose.Schema({
   _id:{type:mongoose.Schema.Types.ObjectId,required:true},
   name:{type:String,required:true},
   link:{type:String,required:true},
   task:{type:mongoose.Schema.Types.ObjectId,ref:'Task',required:true},
   user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
   created_at:{type:Date,default: Date.now }
});


ScreenshotSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Screenshot',ScreenshotSchema);