var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
    return `id: ${this.id} | color: ${this.color}`;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(id){
    var bici = Bicicleta.allBicis.find(x => x.id == id);
    if (!bici)
        throw new Error(`No existe una bicicleta con el id ${id}`);
    return bici;
}

Bicicleta.removeById = function(id){
    for(var i = 0; i < Bicicleta.allBicis.length; i++){
        if (Bicicleta.allBicis[i].id == id){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

var a = new Bicicleta(1, 'rojo', 'urbana', [-34.60838629640303, -58.389220132476694]);
var b = new Bicicleta(2, 'blanca', 'urbana', [-34.61106179220947, -58.396666106936536]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;