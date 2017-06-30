(function () {
  'use strict';

  angular.module('benSeed.signup', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/signup', {
          templateUrl: '/app/signup/signup.html',
          controller: 'signupCtrl'
        });
      })
      .controller('signupCtrl', function ($rootScope, $scope, api, AuthService, $location, AUTH_EVENTS,
                                          toastr, USER_ROLES) {
        if($scope.currentUser) {
          $location.path('/');
        }

        $scope.creds = {};

        $scope.signUp = (creds) => {
          $scope.loading = true;
          api.createUser(creds)
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