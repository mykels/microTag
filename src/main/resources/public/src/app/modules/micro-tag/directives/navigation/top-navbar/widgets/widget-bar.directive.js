angular.module('microTag')
	.directive('mtWidgetBar', widgetBarDirective);

function widgetBarDirective() {
	return {
		restrict: 'AE',
		scope: {
			navbar: '=',
			collapseWidgetBar: '&'
		},
		replace: true,
		templateUrl: 'widget-bar.html',
		controller: 'WidgetBarController'
	};
}
