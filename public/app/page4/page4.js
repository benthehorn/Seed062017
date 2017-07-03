'use strict';
(function () {


  angular.module('benSeed.page4', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/page4', {
          templateUrl: '/app/page4/page4.html',
          controller: 'page4Ctrl'
        });
      })
      .controller('page4Ctrl', function ($scope, api) {
        if($scope.currentUser) {
          $location.path('/');
        }

        $scope.creds = {};

        $scope.signUp = (creds) => {
          $scope.loading = true;
          api.createAdmin(creds)
              .success(() => {
                // Get the logged in user from the server
                AuthService.auth()
                    .success(user => {
                      $scope.loading = false;
                      $rootScope.setCurrentUser(user);
                      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                      $location.path('/');
                    })
                    .error(() => {
                      $scope.loading = false;
                      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                      $location.path('/login');
                    });

                $scope.errorMessage = '';
              })
              .error((data, status) => {
                $scope.loading = false;
                switch (status) {
                  case 400:
                  case 409:
                  case 420:
                    $scope.errorMessage = data.message;
                    $timeout(() => {
                      $('#signUpButton').trigger('signUpEvent');
                    }, 0);

                    break;
                  case 500:
                  default:
                    toastr.error('Something happened. Refresh and try again.', 'Error');
                }
              });
        };
      });
}());
