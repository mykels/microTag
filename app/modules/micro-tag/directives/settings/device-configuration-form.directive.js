angular.module('microTag')
	.directive('mtDeviceConfigurationForm', deviceConfigurationFormDirective);

function deviceConfigurationFormDirective() {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'app/modules/micro-tag/views/settings/device-configuration-form.html',
		controller: 'DeviceConfigurationFormController'
	};
}
