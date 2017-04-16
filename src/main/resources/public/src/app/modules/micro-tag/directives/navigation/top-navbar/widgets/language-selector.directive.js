angular.module('microTag')
	.directive('mtLanguageSelector', languageSelectorDirective);

function languageSelectorDirective() {
	return {
		restrict: 'AE',
		scope: {
			onSelect: '&'
		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/navigation/topbar/widgets/language-selector.html',
		controller: 'LanguageSelectorController'
	};
}
