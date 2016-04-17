angular
	.module('HackerCore.io')
	.factory('userservice', UserService);

UserService.$inject = ['$http', '$q'];

function UserService($http, $q) {
	var baseUrl = '/api/user';

	return {
		login: login,
		loginStatus: loginStatus,
		logout: logout,
		me: me,
		notifications: notifications
	};

	function login(username, password) {
		var deferred = $q.defer();

		var data = {
			username: username,
			password: password
		};

		$http.post(baseUrl + '/login', data)
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}

	function loginStatus() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/status')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}

	function logout() {
		var deferred = $q.defer();

		$http.post(baseUrl + '/logout')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}

	function me() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/me')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}

	function notifications() {
		var deferred = $q.defer();

		$http.get(baseUrl + '/notifications')
		.then(function (response) {
			deferred.resolve(response.data);
		})
		.catch(function (response) {
			deferred.reject(response.data);
		});

		return deferred.promise;
	}
}