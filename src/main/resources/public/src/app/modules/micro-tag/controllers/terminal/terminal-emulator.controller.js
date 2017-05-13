angular.module('microTag')
    .controller('TerminalEmulatorController', terminalEmulatorController);

function terminalEmulatorController($scope, TerminalEmulatorService) {

    activate();

    function activate() {
        angular.extend(TerminalEmulatorService, $scope);

        $scope.handleKeydown = TerminalEmulatorService.handleKeydown;
        $scope.handleTerminalClick = TerminalEmulatorService.handleTerminalClick;
        $scope.handleOutputClick = TerminalEmulatorService.handleOutputClick;
        $scope.terminalState = TerminalEmulatorService.terminalState;
    }

}
