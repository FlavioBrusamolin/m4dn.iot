/*var Momote = require('./modelo');

var listar = function (quandoListar, quandoDerErro) {
    Momote.find()
        .select({ ip: true, _id: false })
        .exec(function (err, momotes) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(momotes);
            }
        });
}

exports.listar = listar;*/

