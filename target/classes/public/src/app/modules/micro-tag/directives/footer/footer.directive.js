angular.module('microTag')
	.directive('mtFooter', footerDirective);

function footerDirective() {
	return {
		restrict: 'AE',
		scope: {

		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/footer/footer.html',
		controller: 'FooterController'
	};
}
