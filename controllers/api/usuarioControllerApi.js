var Usuario = require('../../models/usuario');

exports.list = function(req, res){
    Usuario.find({}, function(err, usuarios){
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

// exports.create = function(req, res){
//     var usuario = Usuario.createInstance(req.body.nombre);
//     Usuario.add(usuario, function(err, newUser){
//         if(err) console.log(err);
//         res.status(200).json({
//             usuario: newUser
//         });
//     });
// };


exports.create = function(req, res){
    var usuario = new Usuario({nombre: req.body.nombre, email: req.body.email, password: req.body.password});
    usuario.save(function(err){
        if(err) return res.status(500).json(err);
        res.status(200).json(usuario);
    });
};

exports.reservar = function(res, req){
    Usuario.findById(req.body.code, function(err, usuario){
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err){
            console.log('reserva guardada');
            res.status(200).send();
        });
    });
};