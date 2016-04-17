angular
	.module('HackerCore.io')
	.factory('projectservice', ProjectService);


ProjectService.$inject = ['$http', '$q'];

function ProjectService($http, $q) {
	var baseUrl = '/api/project';

	return {
		countProjects: countProjects,
		tags: tags
	};

	function countProjects() {
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

	function tags() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/tags')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}
}