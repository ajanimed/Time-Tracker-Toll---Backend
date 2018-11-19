require('dotenv').load();
const mongoose = require('mongoose');
let connection=mongoose.connect(
    'mongodb://ajanimed:'+process.env.MONGO_ATLAS_PW+'@cluster0-shard-00-00-djkiw.mongodb.net:27017,cluster0-shard-00-01-djkiw.mongodb.net:27017,cluster0-shard-00-02-djkiw.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true
    },
    function(err){
        if(err){console.log("error from the database "+err);
        }
        else{
            console.log("connected to the database")
        }
    }
     );
exports.connection = connection;