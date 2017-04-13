angular.module('microTag')
	.service('DeviceSettingsConverter', deviceSettingsConverterService);

function deviceSettingsConverterService(LogLevels) {
	this.fromServer = function (deviceSettings) {
		if (angular.isDefined(deviceSettings)) {
			deviceSettings.logLevel = LogLevels.getByValue(deviceSettings.logLevel);
		}

		return deviceSettings;
	};

	this.toServer = function (deviceSettings) {
		if (angular.isDefined(deviceSettings)) {
			deviceSettings.logLevel = deviceSettings.logLevel.value;
		}

		return deviceSettings;
	}
}
