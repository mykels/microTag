angular.module('microTag')
	.controller('LanguageSelectorController', languageSelectorController);

function languageSelectorController($scope, Languages, LanguageService) {
	activate();

	function activate() {
		initLanguages();

		$scope.languageHandler = {
			selected: Languages.default
		};
	}

	function initLanguages() {
		LanguageService.getAvailableLanguages().then(function (languages) {
			$scope.languages = languages;
		});
	}

	$scope.selectLanguage = function (language) {
		$scope.languageHandler.selected = language;
		LanguageService.set(language.locale);
	}
}
