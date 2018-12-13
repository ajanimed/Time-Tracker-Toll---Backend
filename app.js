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
//authentification route
app.use(require('./routes/auth'));

//protected routes

let userRoute = require('./routes/users');
let EmployeeRoute = require('./routes/employees');
let SupervisorRoute = require('./routes/supervisors');
let TaskCategoryRoute = require('./routes/taskcategories');
let TaskRoute = require('./routes/tasks');
let ScreenShotRoute = require('./routes/screenshots');
app.use(passport.authenticate('jwt', {session: false}),
    userRoute,
    EmployeeRoute,
    SupervisorRoute,
    TaskCategoryRoute,
    TaskRoute,
    ScreenShotRoute
);



module.exports = app;