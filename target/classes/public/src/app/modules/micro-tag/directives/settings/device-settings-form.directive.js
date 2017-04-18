angular.module('microTag')
	.directive('mtDeviceSettingsForm', deviceSettingsFormDirective);

function deviceSettingsFormDirective() {
	return {
		restrict: 'AE',
		scope: {
			deviceSettings: "="
		},
		templateUrl: 'device-settings-form.html',
		controller: 'DeviceSettingsFormController'
	};
}
