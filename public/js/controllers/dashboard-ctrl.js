/** 
 * Dashboard Controller
 */

angular
	.module('HackerCore.io')
	.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['hackathonservice'];

function DashboardCtrl(hackathonservice) {
	var vm = this;

	vm.loading = false;
	vm.numHackathons = 0;

	activate();

	function activate() {
		vm.loading = true;
		hackathonservice.countHackathons()
		.then(function (data) {
			vm.numHackathons = data.count;
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			vm.loading = false;
		});
	}
}