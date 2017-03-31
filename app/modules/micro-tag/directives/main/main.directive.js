angular.module('microTag')
	.directive('mtMain', mainDirective);

function mainDirective() {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'app/modules/micro-tag/views/main/main.html',
		controller: 'MainController'
	};
}
