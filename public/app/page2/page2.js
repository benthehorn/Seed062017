(function () {
  'use strict';

  angular.module('benSeed.page2', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/page2', {
          templateUrl: '/app/page2/page2.html',
          controller: 'page2Ctrl'
        });
      })
      .controller('page2Ctrl', function ($scope, api) {

      });
}());
