angular.module('microTag.core')
    .directive('mtFileBrowser', fileBrowserDirective);

function fileBrowserDirective() {
    return {
        restrict: 'AE',
        scope: {
            mode: '@', // default | simple | button | symbol
            fileHandler: '&',
            fileFilter: '@',
            browseLabel: '@',
            buttonTooltip: '@',
            confirmationTitle: '@',
            confirmationDescription: '@',
            confirmationCallback: '&'
        },
        templateUrl: 'file-browser.html',
        link: fileBrowserLink,
        controller: 'FileBrowserController'
    };

    function fileBrowserLink(scope) {
        scope.browserId = new Date().getTime().toString();

        scope.openBrowser = function () {
            $("#" + scope.browserId).click();
        };
    }
}
