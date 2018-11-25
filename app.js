let express = require("express");
let bodyParser = require('body-parser');
let connection = require('./config/db');
let passport = require('passport');
require('./Midllewears/passport');
let swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./openapi.json');


let app = express();
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//adding swagger ui route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(require('./routes/auth'));
let userRoute = require('./routes/users');
app.use('/users', passport.authenticate('jwt', {session: false}), userRoute);


module.exports = app;