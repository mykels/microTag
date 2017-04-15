angular.module('microTag.core')
    .directive('mtFormDialog', formDialogDialog);

function formDialogDialog() {
    return {
        restrict: 'AE',
        scope: {
            title: '@',
            footerVisible: '=?',
            saveLabel: '@',
            saveClass: '@',
            cancelLabel: '@',
            cancelClass: '@',
            cancelVisible: '=?',
            saveAllowed: '=?',
            saveVisible: '=?',
            saveCallback: '&',
            cancelCallback: '&',
            warningDialog: '=?'
        },
        transclude: true,
        templateUrl: 'src/app/modules/core/views/dialogs/form-dialog.html',
        controller: 'FormDialogController'
    };
}
