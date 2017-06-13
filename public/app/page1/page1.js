(function () {
  'use strict';

  angular.module('benSeed.page1', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/page1', {
          templateUrl: '/app/page1/page1.html',
          controller: 'page1Ctrl'
        });
      })
      .controller('page1Ctrl', function ($scope, api) {

      });
}());
