angular.module('microTag')
    .controller('SessionConfiguratorDialogController', sessionConfiguratorDialogController);

function sessionConfiguratorDialogController($scope, $mdDialog) {
    activate();

    function activate() {
        initSessionConfiguration();
    }

    function initSessionConfiguration() {
        $scope.sessionConfiguration = {
            layoutNumber: 1,
            testSample: 1
        };
    }

    $scope.handleStart = function () {
        $mdDialog.hide();
    };
}
