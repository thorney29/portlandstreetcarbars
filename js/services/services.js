'use strict';

/* Services */

var barListServices = angular.module('barListServices', ['ngResource']);


barListServices.factory('Data', ['$resource',
  function($resource){
    return $resource('bars/:datamarkerId.json', {}, {
      query: {method:'GET', params:{datamarkerId:'bars'}, isArray:true}
    });
  }]);

