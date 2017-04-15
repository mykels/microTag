angular.module('microTag.core')
	.config(languageConfigurator);

function languageConfigurator($translateProvider) {
	activate();

	function activate() {
		registerResourceLoader();
		configurePreferredLanguage();
		initSanitization();
	}

	function registerResourceLoader() {
		$translateProvider.useLoader('TranslationLoader');
	}

	function configurePreferredLanguage() {
		$translateProvider.preferredLanguage('en');
	}

	function initSanitization(){
		$translateProvider.useSanitizeValueStrategy('escape');
	}
}


