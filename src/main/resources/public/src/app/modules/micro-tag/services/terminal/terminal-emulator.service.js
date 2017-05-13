angular.module('microTag')
    .service('TerminalEmulatorService', terminalEmulatorService);

function terminalEmulatorService($q, Keys, TerminalService, ObjectUtils, RandomUtils) {
    var self = this;

    self.handleKeydown = handleKeydown;
    self.handleTerminalClick = handleTerminalClick;
    self.handleOutputClick = handleOutputClick;
    self.focusTerminal = focusTerminal;

    activate();

    function activate() {
        initNavigator();
        initCommands();
        initKeyHandlers();
        initState();
    }

    function initNavigator() {
        self.terminalNavigator = {
            index: 0
        };
    }

    function initCommands() {
        self.internalCommands = {
            clear: {
                command: executeClear
            }
        };
    }

    function initKeyHandlers() {
        self.keyHandlers = {};
        self.keyHandlers[Keys.ENTER] = handleEnter;
        self.keyHandlers[Keys.ARROW_UP] = handleArrowUp;
        self.keyHandlers[Keys.ARROW_DOWN] = handleArrowDown;
    }

    function initState() {
        self.terminalState = {};
        self.terminalState.loading = false;
        self.terminalState.focusOnTerminalLine = false;

        initLines();
    }

    function initLines() {
        self.terminalState.terminalLines = [];
        self.terminalState.terminalLines.push({
            current: true,
            input: '',
            disabled: false
        });
    }

    function handleKeydown(event, terminalLine) {
        var keyHandler = self.keyHandlers[event.keyCode];

        if (angular.isDefined(keyHandler)) {
            keyHandler(terminalLine);
        }
    }

    function handleTerminalClick() {
        focusTerminal();
    }

    function handleOutputClick(terminalOutput) {
        if (angular.isDefined(self.outputClickCallback)) {
            self.outputClickCallback({terminalOutput: terminalOutput});
        }
    }

    function handleEnter(terminalLine) {
        if (angular.isDefined(terminalLine) && angular.isDefined(terminalLine.input) &&
            terminalLine.input.length > 0) {
            handleInput(terminalLine).then(function () {
                if (angular.isDefined(self.commandCallback)) {
                    self.commandCallback({terminalLine: terminalLine});
                }
                moveToNextTerminalLine(terminalLine);
            }, function (error) {
                moveToNextTerminalLine({});
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

        self.terminalState.loading = true;
        TerminalService.execute(terminalLine.input).then(function (response) {
            self.terminalState.loading = false;

            terminalLine.output = response;
            terminalLine.output.id = RandomUtils.guid();

            deferredCommandResult.resolve(terminalLine);
        }, function (error) {
            self.terminalState.loading = false;
            deferredCommandResult.reject(error);
        });
    }

    function handleArrowUp() {
        if (self.terminalNavigator.index >= self.terminalState.terminalLines.length - 1) {
            self.terminalNavigator.index = self.terminalState.terminalLines.length - 2;
        }

        if (self.terminalNavigator.index >= 0) {
            var previousInput = self.terminalState.terminalLines[self.terminalNavigator.index].input;
            self.terminalState.terminalLines[self.terminalState.terminalLines.length - 1].input = previousInput;
            self.terminalNavigator.index--;
        }
    }

    function handleArrowDown() {
        if (self.terminalNavigator.index < 0) {
            self.terminalNavigator.index = 1;
        }

        if (self.terminalNavigator.index < self.terminalState.terminalLines.length - 1) {
            var nextInput = self.terminalState.terminalLines[self.terminalNavigator.index].input;
            self.terminalState.terminalLines[self.terminalState.terminalLines.length - 1].input = nextInput;
            self.terminalNavigator.index++;
        }
    }

    function moveToNextTerminalLine(terminalLine) {
        terminalLine.current = false;
        self.terminalState.terminalLines.push({
            current: true,
            input: ''
        });

        self.terminalNavigator.index = self.terminalState.terminalLines.length - 2;

        focusTerminal();
    }

    function isInternalCommand(terminalLine) {
        return ObjectUtils.contains(self.internalCommands, terminalLine.input.toLowerCase());
    }

    function handleInternalCommand(command, terminalLine) {
        self.internalCommands[command].command(terminalLine);
    }

    function executeClear() {
        self.terminalState.terminalLines = [];
        moveToNextTerminalLine({});
        focusTerminal();
    }

    function focusTerminal() {
        self.terminalState.focusOnTerminalLine = true;
    }
}
