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
            activeForm: '=?',
            saveVisible: '=?',
            saveCallback: '&',
            cancelCallback: '&',
            warningDialog: '=?'
        },
        transclude: true,
        templateUrl: 'form-dialog.html',
        controller: 'FormDialogController'
    };
}
