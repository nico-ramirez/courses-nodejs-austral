var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');

var base_url = 'http://localhost:4000/api/bicicletas';

describe('Bicicleta API', function() {
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
        Bicicleta.removeAll(function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    afterEach(function(done){
        Bicicleta.removeAll(function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe('GET BICICLETAS / ', function() {
        it('Status 200', function(done) {
            Bicicleta.removeAll(function(err, success){
                if(err) console.log(err);
                request.get( base_url, function(err, res, body){
                    if(err) console.log(err);
                    var result = JSON.parse(body);
                    expect(res.statusCode).toBe(200);
                    expect(result.bicicletas.length).toBe(0);
                    done();
                });
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', function(done) {
            var headers = {'content-type' : 'application/json' };
            var newBici = '{ "code": 10, "color": "azul", "modelo": "montaña", "lat": -34.5, "lng": -54.1 }';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: newBici
            }, function(err, res, body){
                expect(res.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                expect(bici.color).toBe("azul");
                expect(bici.modelo).toBe("montaña");
                expect(bici.ubicacion[0]).toBe(-34.5);
                expect(bici.ubicacion[1]).toBe(-54.1);
                done();
            });
        });
    });
});