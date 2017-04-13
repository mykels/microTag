angular.module('microTag')
	.controller('TerminalController', terminalController);

function terminalController($scope, $q, TerminalService, ObjectUtils, Keys) {
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
		$scope.terminalCommands = {
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

	$scope.handleKeydown = function (event, terminalLine) {
		var keyHandler = $scope.keyHandlers[event.keyCode];

		if (angular.isDefined(keyHandler)) {
			keyHandler(terminalLine);
		}
	};

	$scope.handleTerminalClick = function () {
		$scope.terminalHandler.focusOnTerminalLine = true;
	};

	function handleEnter(terminalLine) {
		if (angular.isDefined(terminalLine) && angular.isDefined(terminalLine.input)
			&& terminalLine.input.length > 0) {
			handleInput(terminalLine).then(function () {
				moveToNextTerminalLine(terminalLine);
			});
		}
	}

	function handleInput(terminalLine) {
		var deferred = $q.defer();

		if (isCommand(terminalLine)) {
			handleCommand(terminalLine.input.toLowerCase(), terminalLine);
			deferred.resolve('');
		} else {
			terminalLine.disabled = true;

			$scope.terminalHandler.loading = true;
			TerminalService.execute(terminalLine.input).then(function () {

				$scope.terminalHandler.loading = false;

				terminalLine.output = {
					lines: ["\"" + terminalLine.input + "\"" + " is not recognized as an internal or external command"],
					isError: true
				};

				deferred.resolve('');
			});
		}

		return deferred.promise;
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

	function isCommand(terminalLine) {
		return ObjectUtils.contains($scope.terminalCommands, terminalLine.input.toLowerCase());
	}

	function handleCommand(command, terminalLine) {
		$scope.terminalCommands[command].command(terminalLine);
	}

	function executeHelp(terminalLine) {
		terminalLine.output = {lines: ["clear: clears the terminal", "exit: exits the terminal"]};
	}

	function executeClear() {
		$scope.terminalLines = [];
	}
}
