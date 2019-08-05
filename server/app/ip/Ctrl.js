var ips = require('./ips');

var criar = function (req, res) {
    ips.criar(req.body.ip, function (ips) {
        res.status(200).json(ips);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

var listar = function (req, res) {
    ips.listar(function (ips) {
        res.status(200).json(ips);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

var desconectar = function (req, res) {
    ips.desconectar(req.body.ip, function (ips) {
        res.status(200).json(ips);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

var verificar = function (req, res) {
    ips.verificar(req.body.ip, function (ips) {
        res.status(200).json(ips);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

var implementarAviso = function (req, res) {
    ips.implementarAviso(req.body.ip, function (ips) {
        res.status(200).json(ips);
    }, function (erro) {
        res.status(400).json(erro);
    });
}

exports.criar = criar;
exports.verificar = verificar;
exports.listar = listar;
exports.desconectar = desconectar;
exports.implementarAviso = implementarAviso;