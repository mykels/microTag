angular.module('microTag.core')
    .service("ActionBuilder", actionBuilderService);

function actionBuilderService(ObjectUtils, Navigator) {
    var self = this;

    this.build = function (name, color, clickCallback, disabled, symbol, visible, checkPermission) {
        return {
            name: name,
            color: color,
            click: clickCallback,
            disabled: disabled,
            title: name,
            symbol: symbol,
            visible: ObjectUtils.defaultValue(visible, true),
            permission: ObjectUtils.defaultValue(checkPermission, false)
        };
    };

    this.buildLink = function (name, color, link, disabled, symbol, visible, checkPermission) {
        var action = self.build(name, color, undefined, disabled, symbol, visible, checkPermission);
        action.link = link;
        return action;
    };

    this.buildInlineActions = function (actions, itemScopeExtractor) {
        var inlineActions = [];
        angular.forEach(actions, function (action, index) {
            inlineActions.push(buildInlineAction(action, itemScopeExtractor));
            if (index < actions.length - 1) {
                inlineActions.push(null);
            }
        });

        return inlineActions;
    };

    function buildInlineAction(action, itemScopeExtractor) {
        action.handler = function ($itemScope) {
            if (angular.isDefined(action.click)) {
                action.click(itemScopeExtractor($itemScope));
            } else if (angular.isDefined(action.link)) {
	            Navigator.navigateTo(action.link);
            }
        };

        return action;
    }
}
