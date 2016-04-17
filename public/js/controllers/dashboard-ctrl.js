/** 
 * Dashboard Controller
 */

angular
	.module('HackerCore.io')
	.controller('DashboardCtrl', DashboardCtrl);

DashboardCtrl.$inject = ['hackathonservice', 'projectservice'];

function DashboardCtrl(hackathonservice, projectservice) {
	var vm = this;

	vm.loading = false;
	vm.numHackathons = 0;
	vm.numProjects = 0;

	activate();

	function activate() {
		vm.loading = true;
		hackathonservice.countHackathons()
		.then(function (data) {
			vm.numHackathons = data.count;

			return projectservice.countProjects();
		})
		.then(function (data) {
			vm.numProjects = data.count;
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			vm.loading = false;
		});
	}
}