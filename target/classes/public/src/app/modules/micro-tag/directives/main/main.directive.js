angular.module('microTag')
	.directive('mtMain', mainDirective);

function mainDirective() {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'main.html',
		controller: 'MainController'
	};
}
