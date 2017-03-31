angular.module('microTag')
	.directive('mtLanguageSelector', languageSelectorDirective);

function languageSelectorDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/navigation/top-navbar/widgets/language-selector.html',
		controller: 'LanguageSelectorController'
	};
}
