angular.module('microTag')
	.controller('LogChartCtrl', logChartCtrl);

function logChartCtrl($scope) {
	activate();

	function activate() {
		initOptions();
		initData();
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
				height: 450,
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
				useInteractiveGuideline: true,
				dispatch: {
					stateChange: function (e) {
						console.log("stateChange");
					},
					changeState: function (e) {
						console.log("changeState");
					},
					tooltipShow: function (e) {
						console.log("tooltipShow");
					},
					tooltipHide: function (e) {
						console.log("tooltipHide");
					}
				},
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
				callback: function (chart) {
					console.log("!!! lineChart callback !!!");
				}
			},
			title: {
				enable: true,
				text: $scope.chartTitle
			}
		};
	}
}
