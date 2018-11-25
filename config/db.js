let config = require('config');
let dbConfig = config.get("dbConfig");
const mongoose = require('mongoose');
let connection=mongoose.connect(
    dbConfig.connectString,
    {
        useNewUrlParser: true
    },
    function(err){
        if(err){console.log("error from the database ".red.bold+err);
        }
        else{
            console.log("connected to the database".green.bold);
        }
    }
     );
exports.connection = connection;