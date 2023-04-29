const express = require('express');
const port = process.env.PORT || 8080;
const db = require('./config/mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const { urlencoded } = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const cMare = require('./config/middleware');

const app = express();

//-----------------------------
//Middleware
app.use(urlencoded());
app.use(cookieParser());
//Middleware
//-----------------------------

//-----------------------------
//passport and session
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratagy');
const session = require('express-session');
//passport and session
//-----------------------------

//-----------------------------
//mongo store
const MongoStore = require('connect-mongo')(session);
//mongo store
//-----------------------------

//-----------------------------
//View Engine
app.set('view engine','ejs');
app.set('views','Views');
app.use(express.static('Assests'));
app.use('/uploads', express.static(__dirname + '/uploads'))
//View Engine
//-----------------------------

//-----------------------------
//using layouts
app.use(expressEjsLayouts);
app.set("layout extractStyles" , true);
app.set("layout extractScripts" , true);
//using layouts
//-----------------------------

//-----------------------------
//sessions
app.use(session({
    name: 'milo',
    secret: 'idontknowrightnowbutchangethisone',
    saveUninitialized : false,
    resave : false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled',
    },(err) => {
        err?console.log("Error:",err):console.log("Connected to MongoStore");
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
//sessions
//-----------------------------

//-------------------------
//flash
app.use(flash());
//flash
//-------------------------

//-------------------------
//custom Middleware
app.use(cMare.setFlash);
//custom Middleware
//-------------------------

//-----------------------------
//App Listen
app.use('/',require('./Routes/router'));
app.listen(port, err => {
    err? console.log(`Error connecting server: ${err}`) : console.log(`Server is up on http://localhost:${port}/`);
})
//App Listen
//-----------------------------