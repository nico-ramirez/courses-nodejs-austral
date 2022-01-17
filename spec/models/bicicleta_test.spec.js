var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function() {

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
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe('Bicicleta.createInstance',() => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-54.1);
        });
    });

    describe('Bicicleta.allBicics',() => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    
    describe('Bicicleta.add',() => {
        it('agrego solo una bici', (done) => {
            var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);
            Bicicleta.add(bici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(bici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                
                var bici = Bicicleta.createInstance(1, "verde", "urbana", [-34.5, -54.1]);
                Bicicleta.add(bici, function(err, newBici){
                    if (err) console.log(err);
                    bici2 = Bicicleta.createInstance(2, "roja", "urbana", [-34.5, -54.1]);
                    Bicicleta.add(bici2, function(err, newBici){
                        if(err) console.log(err);
                        Bicicleta.findByCode(1, function(err, targetBici){
                            expect(targetBici.code).toBe(bici.code);
                            expect(targetBici.color).toBe(bici.color);
                            expect(targetBici.modelo).toBe(bici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe remover la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                
                var bici = Bicicleta.createInstance(3, "azul", "urbana", [-34.5, -54.1]);
                Bicicleta.add(bici, function(err, newBici){
                    Bicicleta.allBicis(function(err, bicis){
                        if (err) console.log(err);
                        expect(bicis.length).toBe(1);

                        Bicicleta.removeByCode(3, function(err){
                            Bicicleta.allBicis(function(err, bicis){
                                expect(bicis.length).toBe(0);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeByCode', () => {
        it('debe remover la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                
                var bici = Bicicleta.createInstance(3, "azul", "urbana", [-34.5, -54.1]);
                Bicicleta.add(bici, function(err, newBici){
                    Bicicleta.allBicis(function(err, bicis){
                        if (err) console.log(err);
                        expect(bicis.length).toBe(1);

                        var bici2 = Bicicleta.createInstance(3, "azul", "urbana", [-34.5, -54.1]);
                        Bicicleta.add(bici2, function(err, newBici2){
                            Bicicleta.allBicis(function(err, bicis){
                                if (err) console.log(err);
                                expect(bicis.length).toBe(2);

                                Bicicleta.removeAll(function(err){
                                    Bicicleta.allBicis(function(err, bicis){
                                        expect(bicis.length).toBe(0);
                                        done();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});
// var Bicicleta = require('../../models/bicicleta');

// beforeEach(() => { Bicicleta.allBicis = []; });

// describe('Bicicleta.allBicis', ()=> {
//     it('comienza vacía', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     })
// });

// describe('Bicicleta.add', ()=> {
//     it('agregamos una', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);

//         var bici = new Bicicleta(1, 'rojo', 'urbana', [-34.60838629640303, -58.389220132476694]);
//         Bicicleta.add(bici);

//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[0]).toBe(bici);
//     })
// });

// describe('Bicicleta.findById', () => {
//     it('debe devolver la bici con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var bici1 = new Bicicleta(1, "verde", "urbana");
//         var bici2 = new Bicicleta(2, "roja", "montaña");
//         Bicicleta.add(bici1);
//         Bicicleta.add(bici2);

//         var result = Bicicleta.findById(1);
//         expect(result.id).toBe(1);
//         expect(result.color).toBe(bici1.color);
//         expect(result.modelo).toBe(bici1.modelo);
//     })
// } )