const express = require('express');
const passport = require('../config/passport-local-stratagy');
const user = require('../Models/user');

const Router = express.Router();
const Controller = require('../Controllers/user_c');

Router.get('/sign-in',passport.checkAuthentication2, Controller.signIn);
Router.get('/sign-up',passport.checkAuthentication2, Controller.signUp);

Router.post('/create-an-account', Controller.createAccount);
Router.post('/sign-in',passport.authenticate('local',{
    failureRedirect : '/user/sign-in',
    failureFlash: 'Invalid email or password'
}),Controller.signInPost);

Router.get('/log-out', Controller.logOut);

module.exports = Router;