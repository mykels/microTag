angular.module('microTag')
	.controller('TerminalController', terminalController);

function terminalController($scope, $timeout) {
	activate();

	function activate() {
		$timeout(function () {
			$scope.$broadcast('terminal-output', {
				output: true,
				text: ['Please type \'help\' to open a list of commands'],
				breakLine: true
			});
		}, 100);

		$scope.$on('terminal-input', function (e, consoleInput) {
			var cmd = consoleInput[0];
			console.log(cmd);

			if (cmd.command === 'hi') {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['bye'],
					breakLine: true
				});
			} else if (cmd.command === 'bye') {
				$scope.$broadcast('terminal-output', {
					output: true,
					text: ['hi'],
					breakLine: true
				});
			} else if (cmd.command === 'clear') {
				$scope.$broadcast('terminal-command', {
					command: 'clear'
				});
			} else if (cmd.command === 'remove') {
				$scope.$broadcast('terminal-command', {
					command: 'remove'
				});
			}else if (cmd.command === 'remove-previous') {
				$scope.$broadcast('terminal-command', {
					command: 'remove-previous'
				});
			} else if (cmd.command === 'help') {
				$scope.$broadcast('terminal-command', {
					command: 'help'
				});
			} else if (cmd.command === 'long') {
				// $scope.$broadcast('terminal-output', {
				// 	output: true,
				// 	text: ['Executing ...'],
				// 	breakLine: true
				// });

				// $timeout(function () {
				// 	$scope.$broadcast('terminal-command', {
				// 		command: 'remove-previous'
				// 	});

					// $scope.$broadcast('terminal-output', {
					// 	output: true,
					// 	text: ['finished!'],
					// 	breakLine: true
					// });
				// }, 5000);
			}
		});
	}
}
