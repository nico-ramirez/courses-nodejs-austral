var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function() {
    return 'code: ' + this.code + ' | color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function(callback) {
    return this.find({}, callback);
};

bicicletaSchema.statics.add = function(bici, callback){
    this.create(bici, callback);
}

bicicletaSchema.statics.findByCode = function(code, callback){
    return this.findOne({code: code}, callback);
}

bicicletaSchema.statics.removeByCode = function(code, callback){
    return this.deleteOne({code: code}, callback);
}

bicicletaSchema.statics.update = function(bici, callback){
    return this.update(bici, callback);
}

bicicletaSchema.statics.removeAll = function(callback){
    return this.deleteMany({},callback);
}

module.exports = mongoose.model('Bicicleta', bicicletaSchema);