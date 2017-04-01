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
			functionAppender: '=?',
			useSelection: '=?',
			clearSelection: '=?',
			enableSelectAll: '=?',
			enableDraggable: '=?',
			enableSorting: '=?',
			saveCallback: '&'
		},
		templateUrl: 'app/modules/core/views/grid/paged-grid.html',
		controller: 'PagedGridController'
	};
}
