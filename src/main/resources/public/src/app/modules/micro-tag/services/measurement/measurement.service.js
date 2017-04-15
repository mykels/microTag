angular.module('microTag')
	.service('MeasurementService', measurementService);

function measurementService(HttpHandler, HttpCaller) {
	var self = this;

	activate();

	function activate() {
		self.measurementConfig = {
			type: 'Measurement',
			runUrl: '/measurement/run',
			logTitle: "Measurement",
			unexpectedErrorLog: 'Could not run measurement',
			showSuccessLog: false,
			successLog: "Measurement executed successfully!"
		};
	}

	this.run = function () {
		return HttpCaller.handleHttpRequest({
			executionLog: 'Running measurement',
			httpHandlerFunction: HttpHandler.getAndResolve,
			httpHandlerUrl: self.measurementConfig.runUrl,
			getEntityWhenResolved: false,
			entityConfig: self.measurementConfig,
			expectedErrorLog: 'Could not run measurement',
			logTitle: "Measurement",
			unexpectedErrorLog: 'Could not run measurement'
		}).then(function(response){
			return response.data;
		});
	};
}
