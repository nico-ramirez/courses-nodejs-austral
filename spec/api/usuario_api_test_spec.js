var mongoose = require('mongoose');
var Usuario = require('../../models/usuario');
var request = require('request');

var base_url = 'http://localhost:4000/api/usuarios';

describe('Usuario API', function() {
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

    beforeEach(function(done){
        Usuario.removeAll(function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    afterEach(function(done){
        Usuario.removeAll(function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe('GET USUARIOS / ', function() {
        it('Status 200', function(done) {
            Usuario.removeAll(function(err, success){
                if(err) console.log(err);
                request.get( base_url, function(err, res, body){
                    if(err) console.log(err);
                    var result = JSON.parse(body);
                    expect(res.statusCode).toBe(200);
                    expect(result.usuarios.length).toBe(0);
                    done();
                });
            });
        });
    });

    describe('POST USUARIOS /create', () => {
        it('STATUS 200', function(done) {
            var headers = {'content-type' : 'application/json' };
            var newUsuario = '{ "nombre": "Nicolás" }';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: newUsuario
            }, function(err, res, body){
                expect(res.statusCode).toBe(200);
                var usuario = JSON.parse(body).usuario;
                expect(usuario.nombre).toBe("Nicolás");
                done();
            });
        });
    });
});