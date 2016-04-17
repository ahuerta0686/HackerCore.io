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
            .state('popular-tags', {
                url: '/popularTags',
                templateUrl: 'templates/popularTags.html'
            })
            .state('winning-projects', {
                url: '/winningProjects',
                templateUrl: 'templates/winningProjects.html'
            })
            .state('calendar', {
                url: '/calendar',
                templateUrl: 'templates/calendar.html'
            })
            .state('unpopular-tags', {
                url: '/unpopularTags',
                templateUrl: 'templates/unpopularTags.html'
            })
            .state('manage', {
                url: '/manage',
                templateUrl: 'templates/manage.html',
                controller: 'ManageCtrl',
                controllerAs: 'vm'
            });
    }
]);