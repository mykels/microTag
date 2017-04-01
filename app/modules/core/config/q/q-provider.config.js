angular.module('microTag.core')
	.config(qProviderConfigurator);

function qProviderConfigurator($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);

}
