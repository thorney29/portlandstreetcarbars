'use strict';

/* Services */

var barListServices = angular.module('barListServices', ['ngResource']);

barListServices.factory('Data', ['$resource',
  function($resource){
    return $resource('bars/:datamarkerId.json', {}, {
      query: {method:'GET', params:{datamarkerId:'bars'}, isArray:true}
    });
  }]);

angular.module("barMapApp").service("FavoriteService",[function(){


    //Favorites functions
    this.isLocalStorageEnable = function() {

        if(typeof (Storage) !== "undefined"){
            return true;
        }
        else{
            return false;
        }
    };

    this.isFavorite = function(scope){
        var fav = localStorage.getItem(scope.id);
        return fav === "1";
    };


    this.setFav = function(scope){
        localStorage.setItem(scope.id,"1");

    };


    this.deleteFav = function(scope){
        localStorage.removeItem(scope.id);

    };


}]);