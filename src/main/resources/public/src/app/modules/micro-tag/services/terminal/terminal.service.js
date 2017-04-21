angular.module('microTag')
    .service('TerminalService', terminalService);

function terminalService(HttpHandler, HttpCaller) {
    var self = this;

    activate();

    function activate() {
        self.terminalConfig = {
            type: 'Terminal Command',
            executeCommandUrl: '/terminal/execute/',
            showSuccessLog: false,
            showLoader: false
        };
    }

    this.execute = function (command) {
        return HttpCaller.handleHttpRequest({
            executionLog: 'Executing terminal command ' + command,
            httpHandlerFunction: HttpHandler.getAndResolve,
            httpHandlerUrl: self.terminalConfig.executeCommandUrl + command,
            getEntityWhenResolved: false,
            entityConfig: self.terminalConfig,
            expectedErrorLog: 'Command could not be executed',
            logTitle: "Command Execution",
            unexpectedErrorLog: 'Command could not be executed'
        }).then(function (response) {
            return parseOutput(response.data);
        });
    };

    function parseOutput(response) {
        if (response.type === 'text') {
            parseTextOutput(response);
        }

        return response;
    }

    function parseTextOutput(response) {
        response.data = response.data.split("\n");
    }
}
