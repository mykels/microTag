angular.module('microTag')
	.controller('ChartsController', chartsController);

function chartsController($scope, measurementPoints) {
	activate();

	function activate() {
		$scope.chartData = [{
			values: measurementPoints.powTwo,
			key: 'x^2',
			color: '#3d96ff'
		}, {
			values: measurementPoints.powThree,
			key: 'x^3',
			color: '#ff835e'
		}, {
			values: measurementPoints.log,
			key: '400*log(x)',
			color: '#a531ff'
		}];
	}
}
