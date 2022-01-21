const res = require('express/lib/response');
var Bicicleta = require('../models/bicicleta');

exports.list = function(req, res){
    res.render('bicicletas/index', {bicis: Bicicleta.allBicis});
}

exports.create_get = function(req,res){
    res.render('bicicletas/create');
}

exports.create_post = function(req, res){
    var bici = new Bicicleta(req.body.id, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici);
    res.redirect('/bicicletas'); 
}

exports.update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id);
    res.render('bicicletas/update', {bici});
}

exports.update_post = function(req, res){
    var bici = Bicicleta.findById(req.params.id);
    bici.code = req.body.code;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    
    res.redirect('/bicicletas'); 
}

exports.delete_post = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.redirect('/bicicletas'); 
}