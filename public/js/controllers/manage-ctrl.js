/** 
 * Manage Controller
 */

angular
	.module('HackerCore.io')
	.controller('ManageCtrl', ManageCtrl);

ManageCtrl.$inject = ['hackathonservice']

function ManageCtrl(hackathonservice) {
	var vm = this;

	vm.addHackathon = addHackathon;
	vm.hackathonQuery = "";
	vm.loading = false;
	vm.searchHackathons = searchHackathons;
	vm.searchResults = [];

	function addHackathon(hackathon, searchResultIndex) {
		vm.loading = true;
		hackathonservice.addHackathon(hackathon)
		.then(function (data) {
			vm.searchResults.splice(searchResultIndex, 1);
			console.log(data);
		})
		.catch(function (data) {
			console.log(data);
		})
		.finally(function () {
			vm.loading = false;
		});
	}

	function searchHackathons(query) {
		if (query.trim()) {
			vm.loading = true;
			hackathonservice.searchHackathons(query)
			.then(function (data) {
				vm.searchResults = data;
				console.log(vm.searchResults);
			})
			.catch(function (data) {
				console.log(data);
			})
			.finally(function () {
				vm.loading = false;
			});
		}
	};

}