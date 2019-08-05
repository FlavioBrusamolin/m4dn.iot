angular.module('m4dn').factory('ips', function ($http) {
  var criar = function (ip) {
    var auth = { ip: ip };
    return $http.post('http://localhost:9000/v1/ips/criar', auth);
  };

  var verificar = function (ip) {
    var auth = { ip: ip };
    return $http.post('http://localhost:9000/v1/ips/verificar', auth);
  };

  var listar = function () {
    return $http.get('http://localhost:9000/v1/ips/listar');
  };

  var desconectar = function (ip) {
    var auth = { ip: ip };
    return $http.post('http://localhost:9000/v1/ips/desconectar', auth);
  };

  var implementarAviso = function (ip) {
    var auth = { ip: ip };
    return $http.post('http://localhost:9000/v1/ips/implementarAviso', auth);
  };

  return {
    criar: criar,
    verificar: verificar,
    listar: listar,
    desconectar: desconectar,
    implementarAviso: implementarAviso
  }
});