angular.module('microTag')
	.directive('mtMenuSearch', menuSearchDirective);

function menuSearchDirective() {
	return {
		restrict: 'AE',
		scope: {
			model: '='
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/menu/menu-search.html',
		controller: 'MenuSearchController'
	};
}
