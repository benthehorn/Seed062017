(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('benSeed', [
    'ngRoute',
    'ui.bootstrap',
    'ngCookies',
    'rzModule',
    'toastr',
    'benSeed.directives',
    'benSeed.factories',
    'benSeed.filters',
    'benSeed.welcome',
    'benSeed.page1',
    'benSeed.page2',
    'benSeed.page3',
    'benSeed.page4',
    'benSeed.signup',
    'benSeed.login'
  ])
  .constant('AUTH_EVENTS', {
            loginSuccess: 'auth-login-success',
            loginFailed: 'auth-login-failed',
            logoutSuccess: 'auth-logout-success',
            sessionTimeout: 'auth-session-timeout',
            notAuthenticated: 'auth-not-authenticated',
            notAuthorized: 'auth-not-authorized'
          })
          .constant('USER_ROLES', {
                  all: '*',
                  admin: 'admin',
                  regular: 'regular',
                  guest: 'guest',
                  employer: 'employer'
                })
      .config(function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.otherwise({ redirectTo: '/' });
        $compileProvider.debugInfoEnabled(false);
        $httpProvider.interceptors.push(function ($q, $location, $rootScope, AUTH_EVENTS) {
          return {
            response: function (response) {
              return response;
            },
            responseError: function (response) {
              $rootScope.$broadcast({
              401: AUTH_EVENTS.notAuthenticated,
                              403: AUTH_EVENTS.notAuthorized,
                              419: AUTH_EVENTS.sessionTimeout,
                              440: AUTH_EVENTS.sessionTimeout,
                500: 'Internal server error'
              }[response.status], response);

              return $q.reject(response);
            }
          }
        })
      })
      .controller('AppCtrl', function ($rootScope, $scope, AuthService, AUTH_EVENTS, toastr, USER_ROLES ) {
      $rootScope.isLoggedInEmployer = false;
              $rootScope.isEmployer = false;
              $rootScope.currentUser = null;
              $scope.userRoles = USER_ROLES;
              $scope.isAuthorized = AuthService.isAuthorized;
              $rootScope.setCurrentUser = function (user) {
                $rootScope.currentUser = user;
              console.log('User :' , user.data.userName);
                if (user) {
                  $rootScope.isLoggedInEmployer = user.role === USER_ROLES.employer;
                } else {
                  $rootScope.isLoggedInEmployer = false;
                }
              };
        $scope.logout = () => {
          AuthService.logout()
              .then(() => {
                $rootScope.setCurrentUser(null);
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
              });
        };
      })
      .run(function ($rootScope, api, AuthService, AUTH_EVENTS, USER_ROLES, $location){
      AuthService.auth()
                  .then(user => {
                    $rootScope.setCurrentUser(user);
                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                  })
                  .catch(() => $rootScope.$broadcast(AUTH_EVENTS.loginFailed));
       $rootScope.$on(AUTH_EVENTS.logoutSuccess, () => $location.path('/'));
      });
}());
