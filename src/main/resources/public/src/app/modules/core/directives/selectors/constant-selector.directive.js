angular.module('microTag.core')
	.directive('mtConstantSelector', constantSelectorDirective);

function constantSelectorDirective() {
	return {
		restrict: 'AE',
		scope: {
			mode: '=?',
			constants: '=',
			chosenConstant: '=',
			title: '@',
			constantPlaceholder: '@',
			shouldDisable: '=?',
			searchEnabled: '=?',
			hideValue: '=?',
			isRequired: '=?',
			editedName: '@?',
			onSelectCallback: '&'
		},
		templateUrl: 'constant-selector.html',
		controller: 'ConstantSelectorController'
	};
}
