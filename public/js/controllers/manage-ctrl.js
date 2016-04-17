/** 
 * Manage Controller
 */

angular
	.module('HackerCore.io')
	.controller('ManageCtrl', ManageCtrl);

ManageCtrl.$inject = ['hackathonservice']

function ManageCtrl() {
	var vm = this;

	vm.test = "Hello";
}