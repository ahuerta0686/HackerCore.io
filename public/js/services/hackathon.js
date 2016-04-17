angular
	.module('HackerCore.io')
	.factory('hackathonservice', HackathonService);

HackathonService.$inject = ['$http', '$q'];

function HackathonService($http, $q) {
	return {
		addHackathon: addHackathon
	};

	function addHackathon(slug) {
		var deferred = $q.defer();

		var data = {
			slug: slug
		};

		$http.post(data)
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}
}