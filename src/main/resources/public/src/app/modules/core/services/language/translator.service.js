angular.module('microTag.core')
	.service('Translator', translatorService);

function translatorService($q, $translate) {
	var self = this;

	activate();

	function activate() {
	}

	this.translate = function (text) {
		var deferredTranslation = $q.defer();

		$translate(text.toUpperCase()).then(function (translated) {
			deferredTranslation.resolve(translated);
		}, function (nonTranslated) {
			deferredTranslation.resolve(nonTranslated);
		});

		return deferredTranslation.promise;
	};

	this.translateAll = function (texts) {
		return $q.all(texts.map(self.translate)).then(function (translated) {
			console.log(translated);
		});
	};
}
