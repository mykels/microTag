angular.module('microTag')
	.directive('mtMainContent', mainContentDirective);

function mainContentDirective() {
	return {
		restrict: 'AE',
		scope: {},
		replace:true,
		templateUrl: 'app/modules/micro-tag/views/main/main-content.html',
		controller: 'MainContentController'
	};
}
