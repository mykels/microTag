angular.module('microTag')
    .controller('TerminalController', terminalController);

function terminalController($scope, ColorUtils) {
    $scope.addTab = addTab;
    $scope.removeTab = removeTab;
    $scope.handleCommand = handleCommand;
    $scope.handleTabSelect = handleTabSelect;
    $scope.handleTabDeselect = handleTabDeselect;

    activate();

    function activate() {
        initTabs();
    }

    function initTabs() {
        $scope.tabs = [];
        addTab({title: 'Terminal', type: 'terminal', closable: false});
    }

    function addTab(tab) {
        if (angular.isUndefined(tab.closable)) {
            tab.closable = true;
        }

        tab.active = true;

        if ($scope.tabs > 1) {
            $scope.tabs[$scope.tabs.length - 1].active = false;
        }

        $scope.tabs.push(tab);
    }

    function removeTab(tab) {
        $scope.tabs.splice($scope.tabs.indexOf(tab), 1);
    }

    function handleCommand(terminalLine) {
        if (terminalLine.output.type === "chart") {
            addChartTab(terminalLine.output);
        }
    }

    function addChartTab(terminalOutput) {
        $scope.addTab({
            title: terminalOutput.chartName,
            type: 'chart',
            data: prepareChartData(terminalOutput.data)
        });
    }

    function prepareChartData(chartData) {
        return [{
            values: chartData,
            key: 'random',
            color: ColorUtils.random()
        }];
    }

    function handleTabSelect(tab) {
        if (tab.type === 'terminal') {
            $scope.focusTerminal = true;
        }
    }

    function handleTabDeselect(tab) {
        if (tab.type === 'terminal') {
            $scope.focusTerminal = false;
        }
    }
}
