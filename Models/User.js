let config = require('config');
let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');

let UserSchema = mongoose.Schema({
   _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    name:{type:String,required: true},
    surname:{type:String,required: true},
    middlename:{type:String,required: true},
    tel:{type:String,required: true},
    email:{type:String,required: true},
    password:{type:String,required: true},
    photo:{type:String,default:config.get('uploadPhotoProfileDestination')+"/default.png",required: true},
    created_at:{type:Date,default: Date.now }
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);

