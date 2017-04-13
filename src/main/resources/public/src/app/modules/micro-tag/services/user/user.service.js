angular.module('microTag')
	.service('UserService', userService);

function userService() {
	this.getUser = getUser;

	function getUser() {
		return {
			type: 'Regular',
			picture: 'src/app/img/user/02.jpg'
		}
	}
}
