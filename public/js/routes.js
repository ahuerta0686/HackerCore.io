'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('HackerCore.io').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('manage', {
                url: '/manage',
                templateUrl: 'templates/manage.html',
                controller: 'ManageCtrl',
                controllerAs: 'vm'
            });
    }
]);