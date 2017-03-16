var ngMap = angular.module('mapApp', []);
 
ngMap.controller("BarController", function($scope, $http) {
  $http.get('https://spreadsheets.google.com/feeds/list/0AnAPtHOSNeZvdHBpcU1NemZ5UFJaOXZDMXlBUVdnMWc/od6/public/values?alt=json').
    success(function(data, status, headers, config) {
      $scope.bars = data.feed.entry;
      for (var i = 0; i < data.feed.entry.length; i++) {
        /* get the values from the data file and assign them */
            $scope.bars[i].name= $scope.bars[i].gsx$name.$t;
            $scope.bars[i].image= $scope.bars[i].gsx$image.$t;     
            $scope.bars[i].lat= $scope.bars[i].gsx$lat.$t;
            $scope.bars[i].lng= $scope.bars[i].gsx$lng.$t;
            $scope.bars[i].url= $scope.bars[i].gsx$url.$t;
      }    
    }).
    error(function(data, status, headers, config) {
      console.log("Did not compute");
    });
});
 