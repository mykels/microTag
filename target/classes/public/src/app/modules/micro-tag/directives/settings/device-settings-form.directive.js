angular.module('microTag')
	.directive('mtDeviceSettingsForm', deviceSettingsFormDirective);

function deviceSettingsFormDirective() {
	return {
		restrict: 'AE',
		scope: {
			deviceSettings: "="
		},
		templateUrl: 'src/app/modules/micro-tag/views/settings/device-settings-form.html',
		controller: 'DeviceSettingsFormController'
	};
}
