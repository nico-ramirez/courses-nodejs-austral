const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Usuario = require('../models/usuario');

passport.use(new localStrategy(
    function(email, password, done){
        Usuario.findOne({email: email}, function(err, user){
            if(err) return done(err);
            if(!user) return done(null, false, {message: 'Email no existente o incorrecto'});
            if(!user.validPassword(password)) return done(null, false, {message: 'Contraseña incorrecta'});

            return done(null, user);
        })
    }
));

passport.serializeUser(function(user, callback){
    callback(null, user.id);
});

passport.deserializeUser(function(user, callback){
    Usuario.findById(id, function(err, user){
        callback(err, user); 
    });
});

module.exports = passport;