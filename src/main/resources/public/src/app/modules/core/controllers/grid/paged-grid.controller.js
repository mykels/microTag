angular.module('microTag.core')
	.controller('PagedGridController', pagedGridController);

function pagedGridController($timeout, $scope, $templateCache, uiGridConstants, ObjectUtils, ActionBuilder, StringUtils) {

	function activate() {
		initDefaults();
		initGridOptions();
		initGridEvents();
		initPaginationProperties();
		initSelectionProperties();
		initInlineActions();
		clearSelection();
	}

	function clearSelection() {
		if (!$scope.clearSelection) {
			return;
		}
		$scope.entities.forEach(function (entity) {
			entity.selected = false;
		});
	}

	function initDefaults() {
		$scope.useInlineActions = ObjectUtils.defaultValue($scope.useInlineActions, true);
		$scope.useSelection = ObjectUtils.defaultValue($scope.useSelection, true);
		$scope.clearSelection = ObjectUtils.defaultValue($scope.clearSelection, false);
		$scope.enableSelectAll = ObjectUtils.defaultValue($scope.enableSelectAll, true);
		$scope.enableSorting = ObjectUtils.defaultValue($scope.enableSorting, true);
		$scope.useMenu = ObjectUtils.defaultValue($scope.useMenu, false);
	}

	function initGridOptions() {
		$scope.gridOptions = {
			rowHeight: 46,
			paginationPageSize: 10,
			paginationCurrentPage: 1,
			enablePaginationControls: false,
			enableCellEdit: true,
			enableCellEditOnFocus: true,
			enableColumnResizing: true,
			enableSelectAll: $scope.enableSelectAll,
			enableRowHeaderSelection: $scope.useSelection,
			enableRowSelection: $scope.useSelection,
			enableCellSelection: $scope.useSelection,
			enableGridMenu: $scope.useMenu,
			exporterCsvFilename: $scope.csvFileName,
			exporterMenuPdf: false,
			enableSorting: $scope.enableSorting,
			enableHorizontalScrollbar: uiGridConstants.scrollbars.WHEN_NEEDED,
			enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
			headerRowHeight: 65,
			virtualizationThreshold: 10,
			columnDefs: $scope.columnDefs,
			data: $scope.entities,
			rowTemplate: '<div grid="grid"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell micro-tag-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader, \'micro-tag-grid-selected\': row.entity.selected}" ui-grid-cell></div></div>'
		};
	}

	function initGridEvents() {
		$scope.gridOptions.onRegisterApi = function (gridApi) {
			$scope.gridApi = gridApi;

			initSelectionEvents();
			initEditEvents();
			initResizeEvents();
			initGridFilter();
		};
	}

	function initSelectionEvents() {
		if (angular.isDefined($scope.gridApi.selection)) {
			$scope.gridApi.selection.on.rowSelectionChanged($scope, handleSelectedRow);

			$scope.gridApi.selection.on.rowSelectionChangedBatch($scope, function (rows) {
				rows.forEach(handleSelectedRow);
			});
		}
	}

	function initEditEvents() {
		if (angular.isDefined($scope.saveCallback) && angular.isDefined($scope.gridApi.edit)) {
			$scope.gridApi.edit.on.afterCellEdit($scope, function (rowEntity, colDef, newValue, oldValue) {
				if (newValue !== oldValue && angular.isDefined(newValue)) {
					$scope.saveCallback({entity: rowEntity});
				}
			});
		}
	}

	function initResizeEvents() {
		$scope.gridApi.core.on.gridDimensionChanged($scope,
			function (oldGridHeight, oldGridWidth, newGridHeight, newGridWidth) {
				if (angular.isDefined($scope.resizeCallback)) {
					$scope.gridOptions.columnDefs  = $scope.resizeCallback({
						oldGridHeight: oldGridHeight,
						oldGridWidth: oldGridWidth,
						newGridHeight: newGridHeight,
						newGridWidth: newGridWidth
					});
				}

				$scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
			});
	}

	function handleSelectedRow(row) {
		row.entity.selected = row.isSelected;
	}

	function initGridFilter() {
		$scope.gridApi.grid.registerRowsProcessor(gridFilter, 600);
	}

	function gridFilter(renderableRows) {
		var lowerFilterValue = angular.isDefined($scope.filterValue) ?
			$scope.filterValue.toString().toLowerCase() : "";

		var matcher = new RegExp(lowerFilterValue);

		renderableRows.forEach(function (row) {
			if (angular.isUndefined($scope.filteredColumns)) {
				return true;
			}

			var match = false;

			$scope.filteredColumns.forEach(function (field) {
				var testedFieldValue = getTestedFieldValue(row.entity, field);

				if (lowerFilterValue.length === 0) {
					match = true;
				} else if (StringUtils.isNotEmpty(testedFieldValue) &&
					testedFieldValue.toString().toLowerCase().match(matcher)) {
					match = true;
				}
			});

			if (!match) {
				row.visible = false;
			}
		});

		$scope.filteredEntityCount = _.filter(renderableRows, function (row) {
			return row.visible;
		}).length;

		return renderableRows;
	}

	function getTestedFieldValue(entity, field) {
		if (StringUtils.contains(field, ".")) {
			var fieldParts = field.split(".");
			return entity[fieldParts[0]][fieldParts[1]];
		}

		return entity[field];
	}

	function handleFilteredValue(filterValue, oldFilteredValue) {
		if (angular.isUndefined($scope.gridApi)) {
			return;
		}

		refresh().then(function () {
			$timeout(function () {
				if (angular.isDefined(filterValue) ||
					(angular.isUndefined(filterValue) && angular.isDefined(oldFilteredValue))) {
					initSizeProperties();
				}
			}, 100);
		});
	}

	function refresh() {
		return $scope.gridApi.grid.queueGridRefresh();
	}

	$scope.scrollToFocus = function (rowIndex, colIndex) {
		$scope.gridApi.cellNav.scrollToFocus($scope.gridOptions.data[rowIndex], $scope.gridOptions.columnDefs[colIndex]);
	};

	$scope.onPaginationChange = function (page, pageSize, total) {
		$scope.paginationStart = (page - 1) * pageSize + 1;
		$scope.paginationEnd = $scope.paginationStart + pageSize - 1;
		if ($scope.paginationEnd > total) {
			$scope.paginationEnd = total;
		}
	};

	function initPaginationProperties() {
		initPageSizes();
		initSizeProperties();
		$scope.onPaginationChange(1, $scope.gridOptions.paginationPageSize, $scope.entities.length);
	}

	function initPageSizes() {
		$scope.gridOptions.paginationPageSizes = constructPageSizes([10, 20, 50]);

		if (angular.isDefined($scope.entities) && $scope.entities.length > 50) {
			$scope.gridOptions.paginationPageSizes.push(
				constructPageSize($scope.entities.length));
		} else if (angular.isDefined($scope.entities) && $scope.entities.length < 10) {
			$scope.gridOptions.paginationPageSizes = constructPageSizes([10]);
		}

		if (angular.isUndefined($scope.gridOptions.chosenPaginationPageSize)) {
			handlePaginationPageSizeSelect($scope.gridOptions.paginationPageSizes[0]);
		}
	}

	function handlePaginationPageSizeSelect(chosenPageSize) {
		$scope.gridOptions.chosenPaginationPageSize = chosenPageSize;
		$scope.gridOptions.paginationPageSize = chosenPageSize.value;
	}

	function constructPageSizes(pageSizes) {
		return _.map(pageSizes, constructPageSize);
	}

	function constructPageSize(pageSize) {
		return {
			value: pageSize,
			text: 'show ' + pageSize + ' entities'
		};
	}

	function initSizeProperties() {
		$scope.gridHeight = calculateHeight();
	}

	function initSelectionProperties() {
		$templateCache.put('ui-grid/selectionRowHeader',
			"<div class='ui-grid-disable-selection'><div class='ui-grid-cell-contents selection-cell-contents'>" +
			"<ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>"
		);


		$templateCache.put('ui-grid/selectionRowHeaderButtons',
			"<div><mt-checkbox checkbox-id='{{::row.entity.id}}' checked='row.entity.selected'></mt-checkbox></div>"
		);
	}

	function calculateHeight() {
		var entitiesLength = angular.isDefined($scope.entities) ? $scope.entities.length : 0;

		var gridLength = Math.min($scope.gridOptions.paginationPageSize,
			ObjectUtils.defaultValue($scope.filteredEntityCount, entitiesLength));

		return Math.max(120, gridLength * $scope.gridOptions.rowHeight) + 56;
	}

	function initInlineActions() {
		if (angular.isDefined($scope.entities)) {
			$scope.entities.forEach(function (entity) {
				if (ObjectUtils.isNotEmpty(entity) && ObjectUtils.isNotEmpty(entity.actionsData)) {
					entity.inlineActions = !$scope.useInlineActions ? undefined : ActionBuilder.buildInlineActions(
						entity.actionsData.actions, function ($itemScope) {
							return $itemScope.row.entity;
						});
				}
			});
		}
	}

	function handleEntitiesChange(newEntities, oldEntities) {
		if (angular.isDefined(newEntities) && angular.isDefined(oldEntities) &&
			newEntities.length !== oldEntities.length) {
			$scope.gridOptions.data = newEntities;

			initPaginationProperties();
			appendEntityFunctions(newEntities);

		} else if (angular.isDefined(newEntities)) {
			appendEntityFunctions(newEntities);
		}
		handleFilteredValue(ObjectUtils.defaultValue($scope.filterValue, ''));
	}

	function appendEntityFunctions(entities) {
		if (angular.isDefined($scope.functionAppender)) {
			angular.forEach($scope.functionAppender, function (func, funcName) {
				entities.forEach(function (entity) {
					entity[funcName] = func;
				});
			});
		}
	}

	activate();

	$scope.handlePaginationPageSizeSelect = handlePaginationPageSizeSelect;
	$scope.$watch("gridOptions.paginationPageSize", initPaginationProperties);
	$scope.$watch("filterValue", handleFilteredValue);
	$scope.$watchCollection("entities", handleEntitiesChange);
}
