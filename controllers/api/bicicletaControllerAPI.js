var Bicicleta = require('../../models/bicicleta');

exports.list = function(req, res) {
    Bicicleta.allBicis(function(err, bicis){
        console.log(bicis);
        res.status(200).json({bicicletas:bicis});
    })
}

exports.create = function(req, res) {
    var bici = Bicicleta.createInstance(req.body.code, req.body.color, req.body.modelo);
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici, function(err, newBici){
        if(err) console.log(err);
        res.status(200).json({
            bicicleta: newBici
        });
    });
};

exports.delete = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
};

exports.deleteAll = function(req, res){
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
};