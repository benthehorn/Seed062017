(function () {
  'use strict';

  angular.module('benSeed.directives', [])
      .directive('header', () => {
        return {
          restrict: 'A',
          replace: 'true',
          template: '<div ng-include="\'/app/directives/header.html\'"></div>'
        }
      });
}());