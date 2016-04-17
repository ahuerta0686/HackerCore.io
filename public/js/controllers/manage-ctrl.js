/** 
 * Manage Controller
 */

angular
	.module('HackerCore.io')
	.controller('ManageCtrl', ManageCtrl);

ManageCtrl.$inject = ['hackathonservice']

function ManageCtrl(hackathonservice) {
	var vm = this;

	vm.hackathon = "";
	vm.addHackathon = addHackathon;

	function addHackathon(hackathon) {
		hackathonservice.addHackathon(hackathon)
		.then(function (data) {
			console.log(data);
		})
		.catch(function (data) {
			console.log(data);
		});
	}

}