let config = require('config');
var colors = require('colors');
let serverConfig = config.get("serverConfig");
let http = require('http');
let app = require('./app');
let port = serverConfig.port;
let server = http.createServer(app);
console.log(config.get("env").green.bold+' enviroment is runnig !'.green);
server.listen(process.env.PORT || port, () => console.log(`Time Tracker Tool - Backend listening on port ${port}!`.green.bold));
