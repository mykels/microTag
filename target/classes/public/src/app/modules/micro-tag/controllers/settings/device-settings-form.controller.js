angular.module('microTag')
    .controller('DeviceSettingsFormController', deviceSettingsFormController);

function deviceSettingsFormController($scope, DeviceSettingsService, DocumentUtils, LogLevels, ObjectUtils) {
    activate();

    function activate() {
        backupConfig();

        $scope.logLevels = LogLevels.values;
    }

    function backupConfig() {
        $scope.backupDeviceConfig = ObjectUtils.clone($scope.deviceSettings);
    }

    $scope.handleSave = function () {
        DeviceSettingsService.save($scope.deviceSettings).then(backupConfig);
    };

    $scope.handleReset = function () {
        ObjectUtils.copyInto($scope.backupDeviceConfig, $scope.deviceSettings);
    };

    $scope.handleDownload = function () {
        DeviceSettingsService.download();
    };

    $scope.handleUpload = function (deviceSettingsFile) {
        return DeviceSettingsService.upload(deviceSettingsFile).then(DocumentUtils.reload);
    };

    $scope.hasConfigurationChanged = function () {
        return !ObjectUtils.deepCompare($scope.deviceSettings, $scope.backupDeviceConfig);
    };
}
