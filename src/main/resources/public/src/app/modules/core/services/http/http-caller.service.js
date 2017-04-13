angular.module('microTag.core')
	.service("HttpCaller", httpCallerService);

function httpCallerService($q, ObjectUtils, HttpHandler, LoadingService, ToastService, StringUtils) {
	var self = this;

	this.get = function (entityConfig, entityId, httpConfig) {
		console.log('Getting ' + entityConfig.type + (angular.isDefined(entityId) ? (' : ' + entityId) : ''));
		var deferredGet = $q.defer();

		var getUrl = angular.isDefined(entityId) ? entityConfig.getUrl + entityId : entityConfig.getUrl;

		LoadingService.start();

		HttpHandler.getAndResolve(getUrl, httpConfig)
			.then(function (entityResponse) {
					if (angular.isDefined(entityResponse.success) && !entityResponse.success) {
						console.log('Entity not found');
						deferredGet.resolve({});
					} else {
						console.log("Got {0}{1}".format(entityConfig.type, angular.isDefined(entityId) ?
								(' : ' + entityId) : '') + ' !');

						var fetchedEntity = ObjectUtils.isNotEmpty(entityResponse.data) ? entityResponse.data : entityResponse;

						deferredGet.resolve(angular.isDefined(entityConfig.fromServerConverter) ?
							entityConfig.fromServerConverter(fetchedEntity) : fetchedEntity);
					}

					LoadingService.stop();
				}
				, function (status) {
					LoadingService.stop();
					deferredGet.reject(status);
				});

		return deferredGet.promise;
	};

	this.save = function (entityConfig, entity, loadingIndicator) {
		var entityName = angular.isDefined(entity) ? ObjectUtils
			.defaultValue(entity.name, entityConfig.type) : entityConfig.type;

		return self.handleHttpRequest({
			executionLog: 'Saving ' + (angular.isDefined(entityConfig.type) ?
				(entityConfig.type + ' : ') : '') + entityName,
			httpHandlerFunction: HttpHandler.post,
			httpHandlerUrl: entityConfig.saveUrl,
			httpHandlerData: angular.isDefined(entityConfig.toServerConverter) ?
				entityConfig.toServerConverter(entity) : entity,
			getEntityWhenResolved: true,
			loadingIndicator: loadingIndicator,
			entityId: entityName,
			entityConfig: entityConfig,
			expectedErrorLog: entityName + ' could not be updated!',
			unexpectedErrorLog: 'Something went wrong while updating ' + entityConfig.type + ' :(',
			successLog: entityName + ' saved.'
		});
	};

	this.delete = function (entityConfig, entityName, loadingIndicator) {
		return self.handleHttpRequest({
			executionLog: 'Deleting ' + entityConfig.type + ' : ' + entityName,
			httpHandlerFunction: HttpHandler.delete,
			httpHandlerUrl: entityConfig.deleteUrl + entityName,
			getEntityWhenResolved: false,
			loadingIndicator: loadingIndicator,
			entityId: entityName,
			entityConfig: entityConfig,
			logTitle: 'Deleting ' + entityConfig.type + ' ' + entityName,
			expectedErrorLog: entityName + ' could not be deleted!',
			unexpectedErrorLog: 'Something went wrong while deleting ' + entityName + ' :(',
			successLog: entityName + ' deleted.'
		});
	};

	this.handleHttpRequest = function (options) {
		var deferredRequest = $q.defer();

		deferredRequest.notify('Starting request...');
		console.log(options.executionLog);

		LoadingService.start();

		options.httpHandlerFunction(options.httpHandlerUrl, options.httpHandlerData, options.httpHandlerConfig)
			.then(function (response, status) {
				handleHttpRequestSuccess(options, response, deferredRequest);
			}, function (response, status) {
				handleHttpRequestError(options, status, deferredRequest);
			});

		return deferredRequest.promise;
	};

	function handleHttpRequestSuccess(options, response, deferredRequest) {
		if (angular.isDefined(response.success) && !response.success) {
			handleExpectedError(options, response, deferredRequest);
		} else {
			handleExpectedSuccess(options, response, deferredRequest);
		}

		LoadingService.stop();
	}

	function handleHttpRequestError(options, status, deferredRequest) {
		handleUnexpectedError(options, status, deferredRequest);
		LoadingService.stop();
	}

	function handleExpectedSuccess(options, response, deferredRequest) {
		console.log(options.successLog);

		if (angular.isDefined(options.entityConfig) &&
			(angular.isUndefined(options.entityConfig.showSuccessLog) ||
			options.entityConfig.showSuccessLog)) {
			ToastService.showSuccess(options.successLog, options.logTitle);
		}

		if (options.getEntityWhenResolved) {
			self.get(options.entityConfig, options.entityId).then(function (createdEntity) {
				deferredRequest.resolve(createdEntity);
			});
		} else {
			deferredRequest.resolve(response);
		}
	}

	function handleExpectedError(options, response, deferredRequest) {
		if (angular.isDefined(options.entityId)) {
			showExpectedErrorMsg(options, response);
		} else {
			ToastService.showFatalError(options.unexpectedErrorLog, options.logTitle);
		}

		deferredRequest.reject(options.expectedErrorLog);
	}

	function showExpectedErrorMsg(options, response) {
		if (ObjectUtils.isNotEmpty(response.errors) &&
			StringUtils.isNotEmpty(response.errors.errorDescription)) {
			ToastService.showError(response.errors.errorDescription, options.logTitle);
		} else {
			ToastService.showError(options.expectedErrorLog, options.logTitle);
		}
	}

	function handleUnexpectedError(options, status, deferredRequest) {
		ToastService.showFatalError(options.unexpectedErrorLog, options.logTitle);
		deferredRequest.reject(status);
		LoadingService.stop();
	}
}
