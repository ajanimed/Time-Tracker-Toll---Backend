let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');


let TaskCategorySchema = mongoose.Schema({
   _id:{type:mongoose.Schema.Types.ObjectId,required:true},
   name:{type:String,required:true},
   created_at:{type:Date,default: Date.now }
});

TaskCategorySchema.plugin(mongoosePaginate);
module.exports =  mongoose.model('TaskCategory', TaskCategorySchema);