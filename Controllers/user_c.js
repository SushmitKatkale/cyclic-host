const user = require('../Models/user');

module.exports.signIn = (req,res) => {
    return res.render('./user/sign-in');
}

module.exports.signUp = (req,res) => {
    return res.render('./user/sign-up');
}

module.exports.createAccount = (req,res) => {
    
    if(req.body.userPassword.length < 8){
        req.flash('error','Password length should be more than 8');
        return res.redirect('back');
    }else{
        user.create(req.body).then(() => {
            req.flash('success','Account created succesfully');
            return res.redirect('/user/sign-in');
        }).catch((err) => {
            if(err.code == '11000'){
                req.flash('error','Email already exists ! please log in');
            }
            return res.redirect('back');
        })
    }  
}

module.exports.signInPost = (req,res) => {
    return res.redirect('/milo');
}

module.exports.logOut = (req,res) => {
    req.logout(err=>{
        if(err){
            req.flash('error','Error connecting to server');
            return res.redirect('back');
        }else{
            return res.redirect('/')
        }
    });
}