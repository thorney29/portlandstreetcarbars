'use strict';

/* App Module */

// var barMapApp = angular.module('barMapApp', [
//   'ngRoute',
//   'barListAnimations',
//   'barListControllers',
//   'barListServices',
//   'ui.bootstrap'
// ]);
 
 var barMapApp = angular.module('barMapApp', [
  'ngRoute',
  'barListAnimations',
  'barListControllers',
  'barListServices',
  'ui.bootstrap',
  'ngStorage',
  'angular-loading-bar'
]);

barMapApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 
  function ($routeProvider, $locationProvider, $httpProvider) {

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
        templateUrl: 'partials/contact.php',
        controller: 'ContactCtrl'
      }).
      when('/contact-us', {
        templateUrl: 'contact-us/index.html',
        controller: 'ContactController'
      }).
      when('/toasts', {
        templateUrl: 'partials/toasts.html',
        controller: 'ToastCtrl'
      }).
      when('/thank-you', {
        templateUrl: 'partials/thank-you.html',
        controller: 'HomeCtrl'
      }).
      when('/dashboard', {
          templateUrl: 'partials/dashboard.html',
          controller: 'AccountCtrl'
      }).
     when('/dashboard/login', {
          templateUrl: 'partials/login/home.html',
          controller: 'AccountCtrl'
      }).
      when('/dashboard/signin', {
          templateUrl: 'partials/login/signin.html',
          controller: 'AccountCtrl'
      }).
      when('/dashboard/signup', {
          templateUrl: 'partials/login/signup.html',
          controller: 'AccountCtrl'
      }).
      when('/dashboard/me', {
          templateUrl: 'partials/login/me.html',
          controller: 'AccountCtrl'
      }).
      // this is not new
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      });
      $locationProvider
        .html5Mode(true);


         //this is new
 $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/signin');
                    }
                    return $q.reject(response);
                }
            };
        }]);
  }]);


    