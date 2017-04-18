angular.module('microTag.core')
	.directive('mtPagedGrid', pagedGridDirective);

function pagedGridDirective() {
	return {
		restrict: 'AE',
		scope: {
			entities: '=',
			columnDefs: '=',
			filteredColumns: '=?',
			compactView: '=?',
			useInlineActions: '=?',
			useMenu: '=?',
			csvFileName: '@',
			functionAppender: '=?',
			useSelection: '=?',
			clearSelection: '=?',
			enableSelectAll: '=?',
			enableDraggable: '=?',
			enableSorting: '=?',
			saveCallback: '&',
			resizeCallback: '&'
		},
		templateUrl: 'paged-grid.html',
		controller: 'PagedGridController'
	};
}
