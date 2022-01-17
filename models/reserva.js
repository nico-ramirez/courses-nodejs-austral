var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var reservaSchema = new Schema({
    desde: Date,
    hasta: Date,
    bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta'},
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
});

reservaSchema.methods.diasDeReserva = function() {
    return moment(this.hasta).diff(moment(this.Desde), 'days') + 2;
};

reservaSchema.statics.all = function(callback) {
    return this.find({},callback);
};

module.exports = mongoose.model('Reserva', reservaSchema); 