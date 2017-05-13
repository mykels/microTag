angular.module('microTag')
    .service('DeviceSettingsConverter', deviceSettingsConverterService);

function deviceSettingsConverterService(ObjectUtils) {
    this.fromServer = function (deviceSettings) {
        return deviceSettings;
    };

    this.toServer = function (deviceSettings) {
        if (angular.isDefined(deviceSettings)) {
            ObjectUtils.forEachProperty(deviceSettings, function (deviceSetting) {
                if (deviceSettings[deviceSetting].type === 'enum') {
                    deviceSettings[deviceSetting] = deviceSettings[deviceSetting].value;
                }
            });
        }

        return deviceSettings;
    };
}
