angular.module('microTag')
	.directive('mtDeviceConfigurationForm', deviceConfigurationFormDirective);

function deviceConfigurationFormDirective() {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'app/modules/micro-tag/views/settings/deviceConfigurationForm.html',
		controller: 'DeviceConfigurationFormController'
	};
}
