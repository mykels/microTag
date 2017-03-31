angular.module('microTag.core')
	.service('UserService', userService);

function userService() {
	this.getUser = getUser;

	function getUser() {
		return {
			type: 'Regular',
			picture: 'app/img/user/02.jpg'
		}
	}
}
