angular.module('microTag.core')
	.controller('GroupActionSelectorController', groupActionSelectorController);

function groupActionSelectorController($scope, $q, CollectionUtils, ObjectUtils, ToastService) {
	activate();

	function activate() {
		initActions();
		initSelectedProperty();
	}

	function initActions() {
		$scope.actions.forEach(function (action) {
			action.visible = ObjectUtils.defaultValue(action.visible, true);
		});
	}

	function initSelectedProperty() {
		$scope.selectedProperty = ObjectUtils.defaultValue($scope.selectedProperty, "selected");
	}

	$scope.handleAction = function (action) {
		var selectedEntities = getSelectedEntities();

		if (angular.isDefined(action.isGlobalAction) && action.isGlobalAction) {
			action.callback(selectedEntities);
			return;
		}

		if (CollectionUtils.isNotEmpty(selectedEntities)) {
			if (angular.isDefined(action.map) && angular.isDefined(action.reduce)) {
				action.callback(action.reduce(_.map(selectedEntities, action.map)));
			} else if (angular.isDefined(action.map)) {
				action.callback(_.map(selectedEntities, action.map));
			} else {
				invokeGroupAction(action, selectedEntities);
			}
		} else {
			ToastService.showWarning("Please select at least one element");
		}
	};

	function invokeGroupAction(action, selectedEntities) {
		if ($scope.useSingleCallback === true) {
			action.callback(selectedEntities);
			return;
		}

		var actionPromises = [];

		selectedEntities.forEach(function (selectedEntity) {
			var callbackPromise = action.callback(selectedEntity, selectedEntities.length);

			if (angular.isDefined(callbackPromise.then)) {
				actionPromises.push(callbackPromise);
				callbackPromise.then(function () {
					handleLoader(action, true);
				}).catch(function () {
					handleLoader(action, false);
				});
			}
		});

		handleTermination(actionPromises, action, selectedEntities.length);
	}

	function handleLoader(action, active) {
		if (angular.isUndefined(action.loadingIndicator)) {
			return;
		}

		if (active) {
			action.loadingIndicator.isLoading = true;
			action.loadingIndicator.loadingText = action.groupLoadingText;
		} else {
			action.loadingIndicator.isLoading = false;
		}
	}

	function handleTermination(actionPromises, action, selectedEntitiesCount) {
		$q.all(actionPromises).then(function (actionPromiseResults) {
			handleLoader(action, false);

			if (angular.isDefined(action.onFinishCallback)) {
				action.onFinishCallback(selectedEntitiesCount, actionPromiseResults);
			}
		}).catch(function () {
			handleLoader(action, false);
		});
	}

	function getSelectedEntities() {
		return _.filter($scope.entities, function (entity) {
			return entity[$scope.selectedProperty];
		});
	}
}
