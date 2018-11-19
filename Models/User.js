let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
   _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    name:{type:String,required: true},
    surname:{type:String,required: true},
    tel:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    role:{type:String,enum: ['Admin', 'Employee']},
    created_at:{type:Date,default: Date.now }
});

//module.exports = mongoose.model('User',UserSchema);
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);