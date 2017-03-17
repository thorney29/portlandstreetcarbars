'use strict';
/* Controllers */
var barListControllers = angular.module('barListControllers', ['ui.bootstrap', 'ngRoute']);

barListControllers.controller('BarListCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
    $scope.orderProp = 'type';
    // sets check box filters 
    $('.category').on('change', function() {
      $scope.category_list = [];
      $('#filters :input:checked').each(function() {
        $scope.category = $(this).val();
        $scope.category_list.push($scope.category); //Push each check item's value into an array
      });
      if ($scope.category_list.length == 0) {
        $('.resultblock').fadeIn();
      } else {
        $('.resultblock').each(function() {
          var item = $(this).attr('data-tag');
          if (jQuery.inArray(item, $scope.category_list) > -1) //Check if data-tag's value is in array
            $(this).fadeIn('slow');
          else $(this).hide();
        });
      }
    });
    // bar filters 
    // New Search
    $('li .newsearch').on('click', function() {
      $('input#barQuery').val('');
      $('.opened').toggleClass('opened');
      $('div.form-inline').toggleClass('opened');
    })
    // Get Query
    $('li .getquery').on('click', function() {
      $('.opened').toggleClass('opened');
      $('div.querySort').toggleClass('opened');
    })
    // Sort
    $('li .sort').on('click', function() {
      $('.opened').toggleClass('opened');
      $('div.sorting').toggleClass('opened');
    })
    // Refresh - clear search
    $scope.refresh = function() {
      $scope.query = '';
      $scope.category_list = [];
      $('#filters :input:checked').attr('checked', false); // Unchecks it
      $(".bars li").css("display", "flex");
    }
    $scope.close = function() {
      $('.opened').toggleClass('opened');
      $scope.category_list = [];
      $('#filters :input:checked').attr('checked', false); // Unchecks it
    };
    $('button#back-to-top').on('click', function() {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    })
    // Determine device type to display correct map on apple, android, computers
    $scope.navigate = function(lat, lng, name) {
      var ua = navigator.userAgent.toLowerCase();

      function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
          // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      }
      var ver = iOSversion() || [0];
      var addressLongLat = lat + ',' + lng
      if (ver[0] >= 5) {
        window.open("http://maps.apple.com/?q=" + name, '_system');
        if (navigator.userAgent.match('CriOS')) {
          window.open("comgooglemaps://?q=" + name);
          // window.open("geo:0,0?q="+ name , '_system');
        }
      } else if ((ua.indexOf("android") !== -1)) {
        //window.open("geo:"+addressLongLat);
        window.open("geo:0,0?q=" + name, '_system');
      } else {
        //window.open("http://maps.google.com/?q="+addressLongLat, '_system');
        window.open('https://www.google.com/maps/place/?key=AIzaSyCXOqIYw5VQH9kCQwj3buLfVV3vHvKfxsM&q=' + name);
      }
    };
  }
]);
// Display featured bars  -- currently wine and breweries
barListControllers.controller('RecommendedListView', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
    $scope.features = function(datas) {
      return datas.features;
    };
    $scope.wine = function(datas) {
      return datas.type === "Wine Bar";
    };
    $scope.breweries = function(datas) {
      return datas.type === "Brewery";
    };
  }
]);
barListControllers.controller('HomeCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('NavCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('FooterCtrl', ['$scope', 'Data',
  function($scope, Data) {
    $scope.datas = Data.query();
  }
]);
barListControllers.controller('ContactCtrl', ['$scope', '$http', 'Data',
    function($scope, $http, Data) {
     $scope.datas = Data.query();
}]);
app.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed :( Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
});