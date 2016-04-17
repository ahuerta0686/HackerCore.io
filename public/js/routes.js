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
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            })
            .state('heatmap', {
                url: '/heatmap',
                templateUrl: 'templates/heatmap.html',
                controller: 'HeatmapCtrl',
                controllerAs: 'vm'
            })
            .state('popular-tags', {
                url: '/populartags',
                templateUrl: 'templates/popularTags.html',
                controller: 'PopularTagsCtrl',
                controllerAs: 'vm'
            })
            .state('winning-projects', {
                url: '/popularprojects',
                templateUrl: 'templates/winningProjects.html',
                controller: 'WinningProjectsCtrl',
                controllerAs: 'vm'
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