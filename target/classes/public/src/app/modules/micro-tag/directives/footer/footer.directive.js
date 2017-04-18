angular.module('microTag')
	.directive('mtFooter', footerDirective);

function footerDirective() {
	return {
		restrict: 'AE',
		scope: {

		},
		replace: true,
		templateUrl: 'footer.html',
		controller: 'FooterController'
	};
}
