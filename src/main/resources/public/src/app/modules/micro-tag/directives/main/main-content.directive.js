angular.module('microTag')
	.directive('mtMainContent', mainContentDirective);

function mainContentDirective() {
	return {
		restrict: 'AE',
		scope: {},
		replace:true,
		templateUrl: 'main-content.html',
		controller: 'MainContentController'
	};
}
