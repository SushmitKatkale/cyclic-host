const express = require('express');
const passport = require('../config/passport-local-stratagy');
const user = require('../Models/user');

const Router = express.Router();
const Controller = require('../Controllers/router_c');

Router.get('/', Controller.landing);

Router.use('/user', require('./user'));

Router.use('/milo',passport.checkAuthentication,require('./milo'))

module.exports = Router;