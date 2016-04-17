/**
 * Master Controller
 */

angular.module('HackerCore.io')
    .controller('MasterCtrl', ['$rootScope', '$scope', '$cookieStore', '$uibModal', 'userservice', MasterCtrl]);

function MasterCtrl($rootScope, $scope, $cookieStore, $uibModal, userservice) {
    var vm = this;
    vm.loading = false;
    vm.loggedIn = $rootScope.loggedIn;
    vm.openLogin = openLogin;
    vm.logout = logout;

    function openLogin() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        });

        modalInstance.result
        .then(function (credentials) {
            // vm.loading = true;
            return userservice.login(credentials.username, credentials.password);
        })
        .then(function (data) {
            vm.loggedIn = $rootScope.loggedIn = true;
            $rootScope.username = data.user.username;
            $rootScope.notifications = data.user.notifications;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // vm.loading = false;
        });
    }

    function logout() {
        // vm.loading = true;
        userservice.logout()
        .then(function () {
            vm.loggedIn = $rootScope.loggedIn = false;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // vm.loading = false;
        });
    }

    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}