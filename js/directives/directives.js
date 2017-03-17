'use strict';
 
angular.module('barMapApp')
  .directive('navbar', function () {
    return {
      restrict: 'E',
	  transclude: true,
      templateUrl: '/partials/navbar.html',
      controller: 'NavCtrl'
    };
  });
  angular.module('barMapApp')
  .directive('myfooter', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/partials/myfooter.html',
      controller: 'FooterCtrl'
    };
  });
  angular.module('barMapApp')
  .directive('myMap', function () {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: '/partials/myMap.html',
      controller: 'MapCtrl'
    };
  });
