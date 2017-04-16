angular.module('microTag')
	.service('MeasurementService', measurementService);

function measurementService(HttpHandler, HttpCaller) {
	var self = this;

	activate();

	function activate() {
		self.measurementConfig = {
			type: 'Measurement',
			getUrl: '/measurement/points',
			runUrl: '/measurement/run',
            pointUrl: '/measurement/point',
            sessionPointsUrl: '/measurement/session/points',
			logTitle: "Measurement",
			unexpectedErrorLog: 'Could not run measurement',
			showSuccessLog: false,
			successLog: "Measurement executed successfully!"
		};
	}

	this.getPoints = function () {
		return HttpCaller.get(self.measurementConfig);
	};

	this.run = function () {
		return HttpCaller.handleHttpRequest({
			executionLog: 'Running measurement',
			httpHandlerFunction: HttpHandler.getAndResolve,
			httpHandlerUrl: self.measurementConfig.runUrl,
			getEntityWhenResolved: false,
			entityConfig: self.measurementConfig,
			expectedErrorLog: 'Could not run measurement',
			logTitle: "Measurement",
            successLog: "Measurement executed successfully!",
            unexpectedErrorLog: 'Could not run measurement'
		}).then(function(response){
			return response.data;
		});
	};

    this.getPoint = function () {
        return HttpCaller.handleHttpRequest({
            executionLog: 'Getting measurement point',
            httpHandlerFunction: HttpHandler.getAndResolve,
            httpHandlerUrl: self.measurementConfig.pointUrl,
            getEntityWhenResolved: false,
            entityConfig: self.measurementConfig,
            expectedErrorLog: 'Could not run measurement',
            successLog: "Measurement executed successfully!",
            logTitle: "Statistics",
            unexpectedErrorLog: 'Could not run measurement'
        }).then(function(response){
            return response.data;
        });
    };

    this.getSessionPoints = function () {
        return HttpCaller.handleHttpRequest({
            executionLog: 'Running measurement',
            httpHandlerFunction: HttpHandler.getAndResolve,
            httpHandlerUrl: self.measurementConfig.sessionPointsUrl,
            getEntityWhenResolved: false,
            entityConfig: self.measurementConfig,
            expectedErrorLog: 'Could not get session points',
            successLog: "Measurement executed successfully!",
            logTitle: "Statistics",
            unexpectedErrorLog: 'Could not get session points'
        }).then(function(response){
            return response.data;
        });
    };
}
