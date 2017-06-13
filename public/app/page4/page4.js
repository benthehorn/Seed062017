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

      });
}());
