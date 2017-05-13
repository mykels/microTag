angular.module('microTag')
    .controller('DeviceSettingsFormController', deviceSettingsFormController);

function deviceSettingsFormController($scope, DeviceSettingsService, DocumentUtils, ObjectUtils) {
    activate();

    function activate() {
        backupConfig();
        initFields();
    }

    function backupConfig() {
        $scope.backupDeviceSettings = ObjectUtils.clone($scope.deviceSettings);
    }

    function initFields() {
        DeviceSettingsService.getFields().then(function (fields) {
            $scope.fields = fields;
        });
    }

    $scope.handleSave = function () {
        DeviceSettingsService.save($scope.deviceSettings).then(backupConfig);
    };

    $scope.handleReset = function () {
        ObjectUtils.copyInto($scope.backupDeviceSettings, $scope.deviceSettings);
    };

    $scope.handleDownload = function () {
        DeviceSettingsService.download();
    };

    $scope.handleUpload = function (deviceSettingsFile) {
        return DeviceSettingsService.upload(deviceSettingsFile).then(DocumentUtils.reload);
    };

    $scope.hasConfigurationChanged = function () {
        return !ObjectUtils.deepCompare($scope.deviceSettings, $scope.backupDeviceSettings);
    };
}
