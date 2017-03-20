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
  angular.module('barMapApp')
  .directive("albumDirective", ["FavoriteService", 
    function(FavoriteService) {

      return {
          restrict: "AE",
          templateUrl: "/partials/AlbumDirective.html",
          replace: true,
          scope: {
              id: "=albumId"
          },
      link: function(scope)
          {
                scope.isLocalStorageEnable = FavoriteService.isLocalStorageEnable;
                scope.isFavorite = FavoriteService.isFavorite(scope);

              scope.markAs = function(type) {
                switch(type) {
                  case true :
                    FavoriteService.setFav(scope);
                    break;
                  case false : 
                    FavoriteService.deleteFav(scope);
                    break;

                }
                scope.isFavorite = type;
              }

          }
  };

}]);