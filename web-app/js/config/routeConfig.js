angular.module("m4dn").config(function ($routeProvider) {
	$routeProvider.when("/login", {
		templateUrl: "view/login.html",
		controller: "loginCtrl"
	});

	$routeProvider.when("/signup", {
		templateUrl: "view/cadastro.html",
		controller: "cadastroCtrl"
	});

	$routeProvider.when("/topology", {
		templateUrl: "view/topologia.html",
		controller: "topologiaCtrl"
	});

	$routeProvider.otherwise({ redirectTo: "/login" });
});