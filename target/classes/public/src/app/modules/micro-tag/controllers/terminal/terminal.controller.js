angular.module('microTag')
    .controller('TerminalController', terminalController);

function terminalController($scope, ColorUtils, TerminalTabService) {
    activate();

    $scope.handleCommand = handleCommand;
    $scope.handleOutputClick = handleOutputClick;

    function activate() {
        $scope.tabState = TerminalTabService.tabState;
        $scope.removeTab = TerminalTabService.removeTab;
        $scope.handleTabSelect = TerminalTabService.handleTabSelect;
        $scope.handleTabDeselect = TerminalTabService.handleTabDeselect;
    }

    function handleCommand(terminalLine) {
        if (terminalLine.output.type === "chart") {
            addChartTab(terminalLine.output);
        }
    }

    function addChartTab(terminalOutput) {
        TerminalTabService.addTab({
            id: terminalOutput.id,
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

    function handleOutputClick(terminalOutput) {
        if (terminalOutput.type === 'chart') {
            goToChartTab(terminalOutput);
        }
    }

    function goToChartTab(terminalOutput) {
        TerminalTabService.setActiveTab(TerminalTabService.findTab(terminalOutput.id));
    }
}
