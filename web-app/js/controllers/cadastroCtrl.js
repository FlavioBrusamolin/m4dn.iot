angular.module('m4dn').controller('cadastroCtrl', function ($scope, $location, usuarios) {
    $scope.usuario = {};

    // $scope.submitForm = function(isValid) {
    $scope.cadastrar = function (usuario) {
        var promise = usuarios.cadastrar(usuario);
        promise.then(function (resultado) {
            $location.path('#!/login');
            alert('Successful registration.');
        });
        promise.catch(function (err) {
            alert('It was not possible to register.');
        });
    };
    // $scope.submitted = true;
    // };
});