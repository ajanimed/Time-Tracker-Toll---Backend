//passport.js
let passport = require('passport');
require('dotenv').load();
let LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
let User = require("../Models/User");
let Employee = require("../Models/Employee");
let Administrator = require("../Models/Employee");
let Supervisor = require("../Models/Supervisor");
let passwordHash = require('password-hash');

//Defining the local strategy
passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, cb) {
            return User.findOne({email:email})
                .then(user => {
                    if (!user) {
                        let message = 'Incorrect email or password';
                        return cb(null, false, message);
                    }
                    else{
                        if(passwordHash.verify(password, user.password)){
                            let message = 'Logged In Successfully';
                            return cb(null, user, message);
                        }
                        else{
                            let message = 'Incorrect email or password';
                            return cb(null, false,message);
                        }
                    }
                })
                .catch(err => cb(err));
        }));

//passport-jwt strategy ( to protect routes)
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {
        return User.findOne(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));


module.exports = passport;