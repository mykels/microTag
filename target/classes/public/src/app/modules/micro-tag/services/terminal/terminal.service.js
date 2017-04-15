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
			return {
				lines: parseOutput(response.data.output),
				isError: response.data.isError
			};
		});
	};

	function parseOutput(output) {
		return output.split("\n");
	}
}
