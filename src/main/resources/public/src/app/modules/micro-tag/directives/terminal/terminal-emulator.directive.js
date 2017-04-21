angular.module('microTag')
    .directive('mtTerminalEmulator', terminalEmulatorDirective);

function terminalEmulatorDirective() {
    return {
        restrict: 'AE',
        scope: {
            commandCallback: '&',
            terminalPadding: '@',
            terminalFocus: '=?'
        },
        templateUrl: 'terminal-emulator.html',
        controller: 'TerminalEmulatorController'
    };
}
