const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../Models/user');

passport.use(new LocalStrategy({
        usernameField : 'userEmail',
        passwordField: 'userPassword'
    },
    (userEmail,password,done) => {
        User.findOne({userEmail : userEmail}).then((user) => {
            if(!user || user.userPassword != password){
                console.log('invalid email or password');
                return done(null,false);
            }else{
                console.log('Done');
                done(null,user);
            }
        }).catch(err => {
            console.log("error", err);
            return done(err);
        })
    }
));


passport.serializeUser((user,done) => {
    done(null, user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        return done(null , user);
    }).catch(()=>{
        console.log("Error connecting to server");
    })
})


passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/user/sign-in');
}

passport.setAuthenticateUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

passport.checkAuthentication2 = (req,res,next) => {
    if(!req.isAuthenticated()){
        return next();  
    }
    return res.redirect('/milo');
}

module.exports = passport;