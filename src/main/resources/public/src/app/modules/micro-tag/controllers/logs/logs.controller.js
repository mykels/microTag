angular.module('microTag')
    .controller('LogsController', logsController);

function logsController($scope, $routeParams, logFiles, LogService, LogFileService, LoadingService,
                        DocumentUtils) {
    activate();

    function activate() {
        $scope.logFiles = logFiles;
        $scope.loadingIndicator = LoadingService.loadingIndicator;
        $scope.logFileName = $routeParams.logFileName;

        initGroupActions();
    }

    function initGroupActions() {
        $scope.logGroupActions = [
            {name: "Send Mail", callback: sendMail, map: getLogName},
            {name: "Download", callback: downloadLog, map: getLogName},
            {
                name: "Delete",
                loadingIndicator: $scope.loadingIndicator,
                groupLoadingText: "Deleting pages...",
                callback: deletePage,
                onFinishCallback: afterDeletePage
            }
        ];
    }

    function sendMail(logFileNames) {
        LogService.sendMail();
        return LogService.download(logFileNames);
    }

    function getLogName(logFile) {
        return logFile.name;
    }

    function downloadLog(logFileNames) {
        return LogService.download(logFileNames);
    }

    function deletePage(logFile) {
        console.log("deleting page...");
        return LogFileService.delete(logFile.name);
    }

    function afterDeletePage() {
        console.log("after deleting page...");
        DocumentUtils.reload();
    }
}
