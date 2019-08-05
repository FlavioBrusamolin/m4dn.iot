angular.module('m4dn').controller('loginCtrl', function ($scope, usuarios, $rootScope) {
	clearInterval($rootScope.reqTopology);

	$scope.usuario = {};

	$scope.entrar = function (usuario) {
		var promise = usuarios.autenticar(usuario.email, usuario.senha);
		promise.then(function (retorno) {
			window.location.replace("#!/topology");
		});
		promise.catch(function (err) {
			$scope.usuario = {};
			alert('Incorrect email or password.');
		});
	};

	$scope.cadastro = function () {
		window.location.replace("#!/signup");
	};
});