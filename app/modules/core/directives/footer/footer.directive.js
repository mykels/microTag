angular.module('microTag.core')
	.directive('mtFooter', footerDirective);

function footerDirective() {
	return {
		restrict: 'AE',
		scope: {

		},
		replace: true,
		templateUrl: 'app/modules/core/views/footer/footer.html',
		controller: 'FooterController'
	};
}
