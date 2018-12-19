let morgan = require('morgan');
let winston = require('./config/winston');
let express = require("express");
let bodyParser = require('body-parser');
let connection = require('./config/db');
let passport = require('passport');
require('./Midllewears/passport');
let swaggerUi = require('swagger-ui-express'),swaggerDocument = require('./openapi.json');


let app = express();
//use morgan & winston logger
app.use(morgan('combined', { stream: winston.stream }));
//use authentification passport strategy
app.use(passport.initialize());
//using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//adding swagger ui route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//authentification route
app.use(require('./routes/auth'));

//protected routes
let userRoute = require('./routes/users');
let AministratorRoute = require('./routes/administrators');
let EmployeeRoute = require('./routes/employees');
let SupervisorRoute = require('./routes/supervisors');
let TaskCategoryRoute = require('./routes/taskcategories');
let TaskRoute = require('./routes/tasks');
let ScreenShotRoute = require('./routes/screenshots');
let TimeLogRoute = require('./routes/timelogs');
app.use(passport.authenticate('jwt', {session: false}),
    userRoute,
    EmployeeRoute,
    AministratorRoute,
    SupervisorRoute,
    TaskCategoryRoute,
    TaskRoute,
    ScreenShotRoute,
    TimeLogRoute
);



module.exports = app;