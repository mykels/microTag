angular.module('microTag.core')
	.service('LanguageService', languageService);

function languageService($translate) {
	var self = this;

	activate();

	function activate() {
	}

	this.set = function (locale) {
		$translate.use(locale);
	};

	this.getChosenLanguage = function () {
		return
	}
}
