angular.module('microTag')
	.controller('LanguageSelectorController', languageSelectorController);

function languageSelectorController($scope, Languages, LanguageService) {
	activate();

	function activate() {
		$scope.languages = Languages.values;

		$scope.languageHandler = {
			selected: Languages.default
		};
	}

	$scope.selectLanguage = function (language) {
		$scope.languageHandler.selected = language;
		LanguageService.set(language.locale);
	}
}
