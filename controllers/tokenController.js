var Usuario = require('../models/usuario');
var Token = require('../models/token');

module.exports = {
    confirmationGet: function(req, res, next){
        Token.findOne({ token: req.params.token }, function(err,token){
            if(!token) return res.status(400).send({ type: 'not-verified', msg: 'Token inválido'});
            Usuario.findById(token._userId, function (err,usuario){
                if(!usuario) return res.status(400).send({ msg: 'No se encontró el usuario'});
                if (usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save(function (err) {
                    if(err) return res.status(500).send({ msg: err.message});
                    res.redirect('/');
                });
            });
        });
    },
};