(function () {
  'use strict';

  angular.module('benSeed.login', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/login', {
          templateUrl: '/app/login/login.html',
          controller: 'loginCtrl'
        });
      })
      .controller('loginCtrl', function ($rootScope, $scope, api, AuthService, AUTH_EVENTS, $location,
                      toastr, $routeParams, $cookieStore) {
// Redirect logged in users
        if ($scope.currentUser) {
          $location.path('/');
        }

        $scope.creds = {};

        $scope.login = (creds) => {
          AuthService.login(creds.email, creds.password)
            .then(function(response) {
              $rootScope.setCurrentUser(response.data);
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              if (typeof $cookieStore.get('returnPath') != 'undefined'
                  && $cookieStore.get('returnPath') != '') {
                $location.path($cookieStore.get('returnPath'));
                $cookieStore.remove('returnPath');
                $cookieStore.remove('returnPathSearch');
              } else if ($routeParams.redirect) {
                $location.path($routeParams.redirect).search('redirect', null);
              } else {
                $location.path('/');
              }
            },
            function(){
              toastr.error('Wrong username or password', 'Try Again');
            });
        };
      });
}());