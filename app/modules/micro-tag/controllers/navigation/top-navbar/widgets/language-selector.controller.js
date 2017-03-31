angular.module('microTag')
	.controller('LanguageSelectorController', languageSelectorController);

function languageSelectorController($scope) {
	activate();

	function activate() {
		var english = {
			locale: 'en',
			name: 'English',
			selected: true
		};

		$scope.language = {
			available: [english],
			selected: english
		};
	}
}
