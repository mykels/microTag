angular.module('microTag.core')
    .service('DialogService', dialogService);

function dialogService($mdDialog) {
	
    this.openConfirmationDialog = function (options) {
        return $mdDialog.show({
            controller: 'ConfirmationDialogController',
            templateUrl: 'confirmation-dialog.html',
            clickOutsideToClose: false,
            locals: {
                options: options
            },
            bindToController: true
        }).then(function () {
            return handleConfirm(options);
        }, handleCancel);
    };

    function handleConfirm(options) {
        if (angular.isDefined(options.onCloseCallback)) {
            options.onCloseCallback();
        }

        return true;
    }

    function handleCancel() {
        return false;
    }
}
