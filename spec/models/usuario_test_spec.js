var mongoose = require('mongoose');
var Usuario = require('../../models/usuario');
var Bicicleta = require('../../models/bicicleta');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', function() {
    beforeAll(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function(){
            console.log('We are connected to test database!');
            done();
        });
    });

    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if(err) console.log(err);
            Usuario.deleteMany({}, function(err, success){
                if(err) console.log(err);
                Bicicleta.deleteMany({}, function(err, success){
                    if(err) console.log(err);
                    done();
                });
            });
        });
    });

    // describe('Cuando un Usuario reserva una bici', () => {
    //     it('debe existir la reserva', (done) => {
    //         const usuario = new Usuario({nombre: "Nicolas"});
    //         usuario.save();
    //         const bicicleta = new Bicicleta({code: 3, color: "verde", modelo: "urbana"});
    //         bicicleta.save();
    //         var hoy = new Date();
    //         var mañana = hoy.getDate() + 1;
    //         usuario.reservar(bicicleta.id, hoy, mañana, function(err,reserva){
    //             Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
    //                 expect(reservas.length).toBe(1);
    //                 expect(reservas[0].diasDeReserva()).toBe(2);
    //                 expect(reservas[0].bicicleta.code).toBe(3);
    //                 expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
    //                 done();
    //             });
    //         });
    //     });
    // });

    describe('Cuando un Usuario reserva una bici', () => {
        it('debe existir la reserva', (done) => {
            const usuario = Usuario.createInstance('Nicolás');
            Usuario.add(usuario, function(err, newUser){
                const bicicleta = new Bicicleta({code: 5, color: "verde", modelo: "urbana"});
                Bicicleta.add(bicicleta,function(err, newBici){
                    var hoy = new Date();
                    var mañana = new Date();
                    mañana.setDate(hoy.getDate() + 1);
                    newUser.reservar(newBici.id, hoy, mañana, function(err,reserva){
                        Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                            expect(reservas.length).toBe(1);
                            expect(reservas[0].diasDeReserva()).toBe(2);
                            expect(reservas[0].bicicleta.code).toBe(5);
                            expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                            done();
                        });
                    });
                });
            });
        });
    });

});
