angular.module('microTag.core')
    .controller('FileBrowserController', fileBrowserController);

function fileBrowserController($scope, StringUtils, DialogService) {
    activate();

    function activate() {
        initMode();
    }

    function initMode() {
        if (angular.isUndefined($scope.mode)) {
            $scope.mode = "default";
        }
    }

    $scope.handleFiles = function (event, files) {
        if (angular.isUndefined(files) || files.length === 0 || angular.isUndefined(files[0])) {
            return;
        }
        
        if (StringUtils.isNotEmpty($scope.confirmationTitle)) {
            handleBrowseConfirmation(files);
        } else {
            handleBrowsedFiles(files);
        }
    };

    function handleBrowseConfirmation(files) {
        DialogService.openConfirmationDialog({
            title: $scope.confirmationTitle,
            description: $scope.confirmationDescription,
            onConfirmCallback: function () {
                handleBrowsedFiles(files);
            }
        }).then(emptyChosenFile, emptyChosenFile);
    }

    function handleBrowsedFiles(files) {
        $scope.fileHandler({file: files[0]});
        emptyChosenFile();
    }

    function emptyChosenFile() {
        $("#" + $scope.browserId).val(null);
    }
}
