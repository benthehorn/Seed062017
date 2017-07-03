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

    function createUser(user) {
      return $http.post('/api/users', user);
    }

    function createAdmin(user) {
      return $http.post('/api/admin', user);
    }

    return {
      getBooksByCity: getBooksByCity,
      getCitiesByBook: getCitiesByBook,
      getBooksByAuthor: getBooksByAuthor,
      getBooksCloseTo: getBooksCloseTo,
      createUser: createUser,
      createAdmin: createAdmin
    };
  });

  app.factory('AuthService', function ($http) {
    function login(email, password) {
      return $http.post('/api/login', { email: email, password: password });
    }

    function logout() {
      return $http.get('/api/logout');
    }

    function auth() {
      return $http.get('/api/auth');
    }

    return {
      login: login,
      logout: logout,
      auth: auth
    };
  });

  app.factory('AuthResolver', function(AuthService) {
    return {
      resolve: () => AuthService.auth()
    };
  });
}());
