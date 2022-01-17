var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reserva = require('./reserva');

var usuarioSchema = new Schema({
    nombre: String
});

usuarioSchema.statics.createInstance = function(nombre){
    return new this({
        nombre: nombre
    });
};

usuarioSchema.methods.reservar = function(biciId, desde, hasta, callback){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta});
    reserva.save(callback);
};

usuarioSchema.statics.all = function(callback) {
    return this.find({}, callback);
};

usuarioSchema.statics.add = function(user, callback){
    this.create(user, callback);
}

// usuarioSchema.methods.save = function(name, callback){
//     var usuario = new Usuario({nombre: name});
//     usuario.save();
// }

usuarioSchema.statics.findByName = function(name, callback){
    return this.findOne({nombre: name}, callback);
}

usuarioSchema.statics.removeByName = function(name, callback){
    return this.deleteOne({nombre: name}, callback);
}

usuarioSchema.statics.update = function(user, callback){
    return this.update(user, callback);
}

usuarioSchema.statics.removeAll = function(callback){
    return this.deleteMany({},callback);
}

module.exports = mongoose.model('Usuario', usuarioSchema);