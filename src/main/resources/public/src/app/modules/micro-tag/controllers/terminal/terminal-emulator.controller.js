angular.module('microTag')
    .controller('TerminalEmulatorController', terminalEmulatorController);

function terminalEmulatorController($scope, $q, TerminalService, ObjectUtils, Keys) {
    $scope.handleKeydown = handleKeydown;
    $scope.handleTerminalClick = handleTerminalClick;

    activate();

    function activate() {
        initHandler();
        initNavigator();
        initCommands();
        initKeyHandlers();
        initLines();
    }

    function initHandler() {
        $scope.terminalHandler = {
            loading: false,
            focusOnTerminalLine: false
        };
    }

    function initNavigator() {
        $scope.terminalNavigator = {
            index: 0
        };
    }

    function initCommands() {
        $scope.internalCommands = {
            help: {
                command: executeHelp
            },
            clear: {
                command: executeClear
            }
        };
    }

    function initKeyHandlers() {
        $scope.keyHandlers = {};
        $scope.keyHandlers[Keys.ENTER] = handleEnter;
        $scope.keyHandlers[Keys.ARROW_UP] = handleArrowUp;
        $scope.keyHandlers[Keys.ARROW_DOWN] = handleArrowDown;
    }

    function initLines() {
        $scope.terminalLines = [];
        $scope.terminalLines.push({
            current: true,
            input: '',
            disabled: false
        });
    }

    function handleKeydown(event, terminalLine) {
        var keyHandler = $scope.keyHandlers[event.keyCode];

        if (angular.isDefined(keyHandler)) {
            keyHandler(terminalLine);
        }
    }

    function handleTerminalClick() {
        focusTerminal();
    }

    function handleEnter(terminalLine) {
        if (angular.isDefined(terminalLine) && angular.isDefined(terminalLine.input) &&
            terminalLine.input.length > 0) {
            handleInput(terminalLine).then(function () {
                if (angular.isDefined($scope.commandCallback)) {
                    $scope.commandCallback({terminalLine: terminalLine});
                }
                moveToNextTerminalLine(terminalLine);
            });
        }
    }

    function handleInput(terminalLine) {
        var deferredCommandResult = $q.defer();

        if (isInternalCommand(terminalLine)) {
            handleInternalCommand(terminalLine.input.toLowerCase(), terminalLine);
            deferredCommandResult.resolve('');
        } else {
            handleExternalCommand(terminalLine, deferredCommandResult);
        }

        return deferredCommandResult.promise;
    }

    function handleExternalCommand(terminalLine, deferredCommandResult) {
        terminalLine.disabled = true;

        $scope.terminalHandler.loading = true;
        TerminalService.execute(terminalLine.input).then(function (response) {
            $scope.terminalHandler.loading = false;

            terminalLine.output = response;

            deferredCommandResult.resolve(terminalLine);
        });
    }

    function handleArrowUp() {
        if ($scope.terminalNavigator.index >= $scope.terminalLines.length - 1) {
            $scope.terminalNavigator.index = $scope.terminalLines.length - 2;
        }

        if ($scope.terminalNavigator.index >= 0) {
            var previousInput = $scope.terminalLines[$scope.terminalNavigator.index].input;
            $scope.terminalLines[$scope.terminalLines.length - 1].input = previousInput;
            $scope.terminalNavigator.index--;
        }
    }

    function handleArrowDown() {
        if ($scope.terminalNavigator.index < 0) {
            $scope.terminalNavigator.index = 1;
        }

        if ($scope.terminalNavigator.index < $scope.terminalLines.length - 1) {
            var nextInput = $scope.terminalLines[$scope.terminalNavigator.index].input;
            $scope.terminalLines[$scope.terminalLines.length - 1].input = nextInput;
            $scope.terminalNavigator.index++;
        }
    }

    function moveToNextTerminalLine(terminalLine) {
        terminalLine.current = false;
        $scope.terminalLines.push({
            current: true,
            input: ''
        });

        $scope.terminalNavigator.index = $scope.terminalLines.length - 2;
    }

    function isInternalCommand(terminalLine) {
        return ObjectUtils.contains($scope.internalCommands, terminalLine.input.toLowerCase());
    }

    function handleInternalCommand(command, terminalLine) {
        $scope.internalCommands[command].command(terminalLine);
    }

    function executeHelp(terminalLine) {
        terminalLine.output = {lines: ["clear: clears the terminal", "exit: exits the terminal"]};
    }

    function executeClear() {
        $scope.terminalLines = [];
    }

    function handleTerminalFocus(isTerminalFocus) {
        if (isTerminalFocus) {
            focusTerminal();
        }
    }

    function focusTerminal() {
        $scope.terminalHandler.focusOnTerminalLine = true;
    }

    $scope.$watch("terminalFocus", handleTerminalFocus);
}
