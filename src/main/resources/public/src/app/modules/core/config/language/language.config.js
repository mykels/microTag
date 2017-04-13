angular.module('microTag.core')
	.config(languageConfigurator);

function languageConfigurator($translateProvider) {
	activate();

	function activate() {
		registerResourceLoader();
		configurePreferredLanguage();
	}

	function registerResourceLoader() {
		$translateProvider.useStaticFilesLoader({
			prefix: 'assets/i18n/',
			suffix: '.json'
		});
	}

	function configurePreferredLanguage() {
		$translateProvider.preferredLanguage('en');
	}
}


