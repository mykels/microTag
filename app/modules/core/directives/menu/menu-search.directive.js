angular.module('microTag.core')
	.directive('mtMenuSearch', menuSearchDirective);

function menuSearchDirective() {
	return {
		restrict: 'AE',
		scope: {
			model: '='
		},
		replace: true,
		templateUrl: 'app/modules/core/views/menu/menu-search.html',
		controller: 'MenuSearchController'
	};
}
