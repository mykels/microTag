angular.module('microTag.core')
    .filter('trusted', trustedFilter);

function trustedFilter($sce) {
	return function(html){
        return $sce.trustAsHtml(html);
    };
}
