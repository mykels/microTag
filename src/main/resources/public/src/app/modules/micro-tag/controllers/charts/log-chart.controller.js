angular.module('microTag')
	.controller('LogChartController', logChartController);

function logChartController($scope, EventEmitter) {
	activate();

	function activate() {
		initOptions();
		initData();
		registerEventListeners();
	}

	function registerEventListeners() {
		EventEmitter.subscribe('sidenavOpened', repaintGraph);
		EventEmitter.subscribe('sidenavClosed', repaintGraph);
		EventEmitter.subscribe('widgetBarCollapsed', repaintGraph);
	}

	function initData() {
		$scope.data = [{
			values: $scope.chartData,
			key: 'Sine Wave',
			color: '#3d96ff'
		}];
	}

	function initOptions() {
		$scope.options = {
			chart: {
				type: 'lineChart',
				margin: {
					top: 20,
					right: 20,
					bottom: 40,
					left: 55
				},
				x: function (d) {
					return d.x;
				},
				y: function (d) {
					return d.y;
				},
				useInteractiveGuideline: false,
				staggerLabels: true,
				showLegend: true,
				showValues: true,
				xAxis: {
					axisLabel: 'Time (ms)'
				},
				yAxis: {
					axisLabel: 'Voltage (v)',
					tickFormat: function (d) {
						return d3.format('.02f')(d);
					},
					axisLabelDistance: 30
				},
				zoom: getZoomProperties(),
				callback: function (chart) {
					console.info("log chart is loaded!");
				}
			}
		};
	}

	function getZoomProperties() {
		return {
			enabled: true,
			useNiceScale: false,
			useFixedDomain: true,
			unzoomEventType: 'dblclick.zoom'
		};
	}

	function repaintGraph() {
		if (angular.isDefined($scope.api)) {
			$scope.api.update();
		}
	}

	$scope.handleWindowResize = function (height) {
		repaintGraph();
	};
}