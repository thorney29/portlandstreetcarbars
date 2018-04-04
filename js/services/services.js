'use strict';

/* Services */

var barListServices = angular.module('barListServices', ['ngResource']);

barListServices.factory('Data', ['$resource',
  function($resource){
    return $resource('bars/:datamarkerId.json', {}, {
      query: {method:'GET', params:{datamarkerId:'bars'}, isArray:true}
    });
  }]);
// This is new
barListServices.factory('Main', ['$http', '$localStorage', 
    function($http, $localStorage){
        var baseUrl = "https://portlandstreetcarbars.herokuapp.com";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post(baseUrl + '/signin', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post(baseUrl + '/authenticate', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/me').success(success).error(error)
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                success();
            }
        };
    }
]);



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
angular.module("barMapApp").service("VisitedService",[function(){
    //Favorites functions
    this.isLocalStorageEnable = function() {

        if(typeof (Storage) !== "undefined"){
            return true;
        }
        else{
            return false;
        }
    };

    this.isVisited = function(scope){
        var visited = localStorage.getItem(scope.id);
        return visited === "1";
    };


    this.setVisited = function(scope){
        localStorage.setItem(scope.id,"1");

    };


    this.deleteVisited = function(scope){
        localStorage.removeItem(scope.id);

    };
}]);
