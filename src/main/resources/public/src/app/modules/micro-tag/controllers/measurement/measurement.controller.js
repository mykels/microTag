angular.module('microTag')
	.controller('MeasurementController', measurementController);

function measurementController($scope, $timeout, MeasurementService, ImageUtils, StringUtils) {
	var self = this;

	activate();

	function activate() {
		// TODO: should be configurable?
		self.blinkTimes = 4;

		initResultHandler();
	}

	function initResultHandler() {
		$scope.resultHandler = {
			blinkCount: 0,
			baseImage: "",
			resultImage: "",
			resultImageVisible: false
		};
	}

	$scope.runMeasurement = function () {
		return MeasurementService.run().then(function (measurement) {
			handleResult(measurement.result);
			animateResult();
		});
	};

	function handleResult(result) {
		$scope.resultHandler.baseImage = ImageUtils.constructUrl(_.find(result, function (image) {
			return StringUtils.contains(image, "base", true);
		}));

		$scope.resultHandler.resultImage = ImageUtils.constructUrl(_.find(result, function (image) {
			return !StringUtils.contains(image, "base");
		}));
	}

	function animateResult() {
		$timeout(function () {
			$scope.resultHandler.resultImageVisible = !$scope.resultHandler.resultImageVisible;

			if ($scope.resultHandler.blinkCount++ <= self.blinkTimes) {
				animateResult();
			} else {
				$scope.resultHandler.visible = true;
				$scope.resultHandler.blinkCount = 0;
			}

		}, 1000);
	}
}