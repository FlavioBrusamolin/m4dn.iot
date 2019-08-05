var IP = require('./modelo');

var criar = function (ip, quandoDerErro, quandoCriou) {
    var novoIP = new IP({ ip: ip, status: 'Conectado', contador: 0 });
    IP.findOneAndUpdate(
        { ip: ip },
        novoIP,
        { upsert: true, new: true, runValidators: true },
        function (err, doc) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoCriou(doc);
            }
        }
    );
}

var listar = function (quandoListar, quandoDerErro) {
    IP.find()
        .select({ ip: true, status: true, contador: true, _id: false })
        .exec(function (err, ips) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                quandoListar(ips);
            }
        });
}

var desconectar = function (ip, quandoDesconectar, quandoDerErro) {
    IP.findOne({ ip: ip })
        .exec(function (err, ips) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                if(ips.contador <= 3) {
                    ips.status = 'Aberto';
                    ips.save();
                    quandoDesconectar(ips);
                }
                else {
                    quandoDesconectar(ips);
                }
            }
        });
}

var verificar = function (ip, quandoVerificar, quandoDerErro) {
    IP.findOne({ ip: ip })
        .exec(function (err, ips) {
            if (err) {
                quandoDerErro(err);
            }
            else {
                ips.status = 'Conectado';
                ips.contador = 0;
                ips.save();
                quandoVerificar(ips);
            }
        });
}

var implementarAviso = function (ip, quandoImplementarAviso, quandoDerErro) {
    IP.findOne({ ip: ip })
    .exec(function (err, ips) {
        if (err) {
            quandoDerErro(err);
        }
        else {
            if(ips.status == 'Aberto') {
                ips.contador = ips.contador + 1;
            }
            if(ips.contador > 3) {
                ips.status = 'Desconectado';
            }
            ips.save();
            quandoImplementarAviso(ips);
        }
    });
}

exports.criar = criar;
exports.verificar = verificar;
exports.listar = listar;
exports.desconectar = desconectar;
exports.implementarAviso = implementarAviso;