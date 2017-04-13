angular.module('microTag')
	.service('TerminalService', terminalService);

function terminalService($q, $timeout) {
	this.execute = function (command) {

		return $q(function (resolve, reject) {
			$timeout(function () {
				resolve('command is executed!');
			}, Math.floor(Math.random() * 1000));
		});
	}
}
