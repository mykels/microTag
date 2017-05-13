angular.module('microTag')
    .directive('mtTerminalEmulator', terminalEmulatorDirective);

function terminalEmulatorDirective() {
    return {
        restrict: 'AE',
        scope: {
            commandCallback: '&',
            outputClickCallback: '&',
            terminalPadding: '@'
        },
        templateUrl: 'terminal-emulator.html',
        controller: 'TerminalEmulatorController'
    };
}
