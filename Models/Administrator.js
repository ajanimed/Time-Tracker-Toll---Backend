let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate-v2');
let User = require("./User");


let AdministratorSchema = mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId,required: true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    function:{type:String,required:true}
});

AdministratorSchema.pre('remove',function(next){
    User.findOne({_id:this.user})
        .exec()
        .then(doc => {
            doc.remove();
        })
        .catch(err => {
            console.log(err);
        })
    next();
});


AdministratorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Administrator', AdministratorSchema);
