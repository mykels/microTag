angular.module('microTag')
    .controller('SessionConfiguratorDialogController', sessionConfiguratorDialogController);

function sessionConfiguratorDialogController($scope, $mdDialog, DeviceSettingsService) {
    activate();

    function activate() {
        initSessionConfiguration();
    }

    function initSessionConfiguration() {
        // TODO: use real tag id to device settings
        DeviceSettingsService.get().then(function (deviceSettings) {
            $scope.sessionConfiguration = {
                readerId: '11ca3bbv34'
            };
        });
    }

    $scope.handleStart = function () {
        $mdDialog.hide();
    };
}
