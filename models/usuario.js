var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reserva = require('./reserva');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const validatreEmail = function(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        typ: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        typ: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        validate: [validatreEmail, 'Por favor, ingrese un email valido'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/]
    },
    nombre: {
        typ: String,
        required: [true, 'El password es obligatorio']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.mathods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

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