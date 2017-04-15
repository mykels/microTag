angular.module('microTag.core')
	.config(loadingBarConfigurator);

function loadingBarConfigurator(cfpLoadingBarProvider) {
	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = false;
}
