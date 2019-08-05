var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('BD_URL', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(cors());

var usuarioCtrl = require('./usuario/Ctrl');
// var momoteCtrl = require('./momote/Ctrl');
var ipCtrl = require('./ip/Ctrl');


app.post('/v1/usuarios', usuarioCtrl.cadastrar);
app.post('/v1/usuarios/auth', usuarioCtrl.autenticar);

// app.get('/v1/momotes', momoteCtrl.listar);

app.post('/v1/ips/criar', ipCtrl.criar);
app.get('/v1/ips/listar', ipCtrl.listar);
app.post('/v1/ips/desconectar', ipCtrl.desconectar);
app.post('/v1/ips/verificar', ipCtrl.verificar);
app.post('/v1/ips/implementarAviso', ipCtrl.implementarAviso);

app.listen(9000, function () {
    console.log('m4dn.iot API');
});