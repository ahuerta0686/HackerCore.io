angular
	.module('HackerCore.io')
	.factory('hackathonservice', HackathonService);


HackathonService.$inject = ['$http', '$q'];

function HackathonService($http, $q) {

	var baseUrl = '/api/hackathon';

	return {
		addHackathon: addHackathon,
		searchHackathons: searchHackathons
	};

	function addHackathon(slug) {
		var deferred = $q.defer();

		var data = {
			slug: slug
		};

		$http.post(baseUrl + '/new', data)
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}

	function searchHackathons(query) {
		var deferred = $q.defer();

		var data = {
			query: query
		};

		$http.post(baseUrl + '/search', data)
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}
}