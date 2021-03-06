angular
	.module('HackerCore.io')
	.factory('hackathonservice', HackathonService);


HackathonService.$inject = ['$http', '$q'];

function HackathonService($http, $q) {

	var baseUrl = '/api/hackathon';

	return {
		addHackathon: addHackathon,
		countHackathons: countHackathons,
		locations: locations,
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

	function countHackathons() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/count')
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

	function locations() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/locations')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}
}