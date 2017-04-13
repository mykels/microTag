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
		templateUrl: 'src/app/modules/micro-tag/views/navigation/topbar/widgets/widget-bar.html',
		controller: 'WidgetBarController'
	};
}
