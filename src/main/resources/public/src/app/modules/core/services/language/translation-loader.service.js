angular.module('microTag.core')
	.factory('TranslationLoader', translationLoader);

function translationLoader(HttpCaller) {
	var self = this;

	activate();

	function activate() {
		self.translationConfig = {
			type: 'Translations',
			getUrl: '/translate.lua/',
			logTitle: "Languages",
			unexpectedErrorLog: "Could not download translations"
		};
	}

	return function (options) {
		return HttpCaller.get(self.translationConfig, options.key);
	};
}
