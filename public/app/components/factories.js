(function () {
  'use strict';

  var app = angular.module('benSeed.factories', ['ngRoute']);

  app.factory('api', ($http) => {

    function getBooksByCity(city) {
      return $http.get(`/api/mongo/books/${city}`);
    }

    function getCitiesByBook(book) {
      return $http.get(`/api/mongo/titles/${book}`);
    }

    function getBooksByAuthor(author) {
      return $http.get(`/api/mongo/authors/${author}`);
    }

    function getBooksCloseTo(location, distance) {
      return $http.get(`/api/mongo/geolocate/${location}/${distance}`);
    }

    return {
      getBooksByCity: getBooksByCity,
      getCitiesByBook: getCitiesByBook,
      getBooksByAuthor: getBooksByAuthor,
      getBooksCloseTo: getBooksCloseTo
    };
  });
}());