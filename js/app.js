'use strict';

/* App Module */

var barMapApp = angular.module('barMapApp', [
  'ngRoute',
  'barListAnimations',
  'barListControllers',
  'barListServices',
  'ui.bootstrap'
]);
 barMapApp.config(['$routeProvider', "$locationProvider",
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: true
    });

    $routeProvider.
      when('/get-directions', {
        templateUrl: 'partials/bars-list.html',
        controller: 'BarListCtrl'
      }).
       when('/favorites', {
        templateUrl: 'partials/favorites.html',
        controller: 'BarListCtrl'
      }).
      when('/bar-crawls', {
        templateUrl: 'partials/bar-crawls.html',
        controller: 'RecommendedListView'
      }).
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
      }).
      when('/toasts', {
        templateUrl: 'partials/toasts.html',
        controller: 'ToastCtrl'
      }).
      when('/thank-you', {
        templateUrl: 'partials/thank-you.html',
        controller: 'HomeCtrl'
      }).
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      });

      // $locationProvider.html5Mode(true);
    
  }]);
 
