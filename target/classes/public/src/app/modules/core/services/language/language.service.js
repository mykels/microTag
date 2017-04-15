angular.module('microTag.core')
	.service('LanguageService', languageService);

function languageService($translate, HttpCaller, Languages) {
	var self = this;

	activate();

	function activate() {
		self.languagesConfig = {
			type: 'Languages',
			getUrl: '/languages',
			logTitle: "Languages",
			unexpectedErrorLog: "Could not get available languages"
		};
	}

	this.set = function (locale) {
		$translate.use(locale);
	};

	this.getAvailableLanguages = function () {
		return HttpCaller.get(self.languagesConfig).then(function (languages) {
			return languages.map(function (language) {
				var locale = language.split(".")[0];
				return Languages.getByProperty("locale", locale);
			});
		});
	}
}
