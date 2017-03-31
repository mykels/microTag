angular.module('microTag.core')
	.controller('TopNavbarController', topNavbarController);

function topNavbarController($scope, UserService, System) {
	activate();

	function activate() {
		$scope.user = UserService.getUser();
		$scope.appName = System.appName;
		$scope.layout = System.layout;
		$scope.navbar = {Collapsed: false};

		// TODO: move to language service

		var english = {
			locale: 'en',
			name: 'English',
			selected: true
		};

		$scope.language = {
			available: [english],
			selected: english
		};


	}

	$scope.logout = function () {
		console.log("loging out");
	}
}
