(function () {
  'use strict';

  angular.module('benSeed.page3', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/page3', {
          templateUrl: '/app/page3/page3.html',
          controller: 'page3Ctrl',
          resolve: {
            auth: AuthResolver => AuthResolver.resolve()
          }
        });
      })
      .controller('page3Ctrl', function ($scope, api, $rootScope) {

      });
}());
