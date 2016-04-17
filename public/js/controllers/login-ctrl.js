/** 
 * Login Controller
 */

angular
	.module('HackerCore.io')
	.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$uibModalInstance', 'userservice'];

function LoginCtrl($uibModalInstance, userservice) {
	var vm = this;
	vm.username = "";
	vm.password = "";
	vm.login = login;
	vm.cancel = cancel;

	function login() {
		$uibModalInstance.close({username: vm.username, password: vm.password});
	}

	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}
}