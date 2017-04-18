angular.module('microTag.core')
    .service('SessionConfiguratorDialogService', sessionConfiguratorDialogService);

function sessionConfiguratorDialogService($mdDialog) {

    this.open = function (options) {
        return $mdDialog.show({
            controller: 'SessionConfiguratorDialogController',
            templateUrl: 'session-configurator-dialog.html',
            clickOutsideToClose: false,
            locals: {
                options: options
            },
            bindToController: true
        }).then(function () {
            return handleConfirm(options);
        }, function () {
            return handleCancel(options);
        });
    };

    function handleConfirm(options) {
        if (angular.isDefined(options.startCallback)) {
            options.startCallback({});
        }

        return true;
    }

    function handleCancel(options) {
        if (angular.isDefined(options.cancelCallback)) {
            options.cancelCallback({});
        }

        return false;
    }
}
