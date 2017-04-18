angular.module('microTag')
	.directive('mtLanguageSelector', languageSelectorDirective);

function languageSelectorDirective() {
	return {
		restrict: 'AE',
		scope: {
			onSelect: '&'
		},
		replace: true,
		templateUrl: 'language-selector.html',
		controller: 'LanguageSelectorController'
	};
}
