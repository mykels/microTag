angular.module('microTag')
    .controller('TerminalController', terminalController);

function terminalController($scope) {
    $scope.addTab = addTab;
    $scope.removeTab = removeTab;
    $scope.handleCommand = handleCommand;

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

        $scope.tabs.push(tab);
    }

    function removeTab(tab) {
        $scope.tabs.splice($scope.tabs.indexOf(tab), 1);
    }

    function handleCommand(terminalLine) {
        if (terminalLine.output.type === "chart") {
            $scope.addTab({
                title: terminalLine.output.chartName,
                type: 'chart',
                data: prepareChartData(terminalLine.output.data)
            });
        }
    }

    function prepareChartData(chartData) {
        return [{
            values: chartData,
            key: 'random',
            color: getRandomColor()
        }];
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
