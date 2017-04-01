angular.module('microTag.utils')
    .service('FileDownloader', fileDownloaderService);

function fileDownloaderService() {
    this.download = function (options) {
    	console.log("file downloaded!");
        // TODO: complete when first version of backend is written
        // return EntityManager.handleHttpRequest({
        //     executionLog: options.executionLog,
        //     httpHandlerFunction: HttpHandler.post,
        //     httpHandlerUrl: options.httpHandlerUrl,
        //     httpHandlerConfig: {
        //         responseType: 'arraybuffer'
        //     },
        //     loadingIndicator: options.loadingIndicator,
        //     entityConfig: options.entityConfig,
        //     logTitle: options.logTitle,
        //     expectedErrorLog: options.expectedErrorLog,
        //     unexpectedErrorLog: options.unexpectedErrorLog,
        //     successLog: options.successLog
        // });
    };
}
