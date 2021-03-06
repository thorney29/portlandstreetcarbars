'use strict';
/**
 * @ngdoc function
 * @name mapApp.controller:MapController
 * @description
 * # MapController
 * Controller of the mapApp
 */
 //Data
var bars = [
  {
    "markerId":"0",
    "name":"Ambonnay Champagne Bar",
    "url":"http://www.ambonnaybar.com/",
    "type":"Bar",
    "address":"107 SE Washington St",
    "city":"Portland",
    "state":"OR",
    "image":"/images/ambonnay.jpg",
    "lat":"45.518814",
    "lng":"-122.664587",
    "A":"y ",
    "B":" +",
    "C":""
  },
  {
    "markerId":"1",
    "name":"B Side Tavern\n\n     ",
    "url":"https://www.facebook.com/pages/B-Side-Tavern/285188399929",
    "type":"Bar",
    "address":"632 E Burnside St",
    "city":"Portland",
    "state":"OR",
    "image":"/images/b-side-tavern.jpg",
    "lat":"45.522739",
    "lng":"-122.658929",
    "A":"A y",
    "B":"",
    "C":"P"
  },
  {
    "markerId":"2",
    "name":"Bunk Bar\n\n",
    "url":"http://www.bunksandwiches.com/bunkbar/",
    "type":"Bar",
    "address":"1028 Southeast Water Avenue #130",
    "city":"Portland",
    "state":"OR",
    "image":"/images/bunk.jpg",
    "lat":"45.515332",
    "lng":"-122.665569",
    "A":"A D O ",
    "B":"",
    "C":""
  },
  {
    "markerId":"3",
    "name":"Burnside Brewing Co.",
    "url":"http://www.burnsidebrewco.com/",
    "type":"Brewery",
    "address":"701 East Burnside Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/burnside-brewing.jpg",
    "lat":"45.523395",
    "lng":"-122.658372",
    "A":"y",
    "B":" +",
    "C":""
  },
  {
    "markerId":"4",
    "name":"Cascade Brewing",
    "url":"http://www.cascadebrewingbarrelhouse.com/",
    "type":"Brewery",
    "address":"939 Southeast Belmont Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/cascade-barrel.jpg",
    "lat":"45.516667",
    "lng":"-122.656041",
    "A":"p",
    "B":" +",
    "C":""
  },
  {
    "markerId":"5",
    "name":"Dig A Pony\n",
    "url":"http://digaponyportland.com/",
    "type":"Bar",
    "address":"736 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/dig-a-pony.jpg",
    "lat":"45.517413",
    "lng":"-122.660375",
    "A":"A l",
    "B":"",
    "C":""
  },
  {
    "markerId":"6",
    "name":"Doug Fir\n",
    "url":"http://www.dougfirlounge.com/",
    "type":"Lounge",
    "address":"830 E Burnside St",
    "city":"Portland",
    "state":"OR",
    "image":"/images/doug-fir.jpg",
    "lat":"45.522641",
    "lng":"-122.656824",
    "A":"A l p ",
    "B":"",
    "C":""
  },
  {
    "markerId":"7",
    "name":"Duff's Garage Bar & Grill",
    "url":"http://www.duffsgarage.com/",
    "type":"Sports",
    "address":"1635 Southeast 7th Avenue",
    "city":"Portland",
    "state":"OR",
    "image":"/images/duffs.jpg",
    "lat":"45.511197",
    "lng":"-122.658737",
    "A":"",
    "B":"",
    "C":""
  },
  {
    "markerId":"8",
    "name":"East Bank Saloon",
    "url":"http://www.eastbanksaloon.com/",
    "type":"Bar",
    "address":"727 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/eastbank-saloon.jpg",
    "lat":"45.517516",
    "lng":"-122.661045",
    "A":"",
    "B":"",
    "C":""
  },
  {
    "markerId":"9",
    "name":"East End\n",
    "url":"http://www.eastendportland.com/",
    "type":"Bar",
    "address":"203 Southeast Grand Avenue",
    "city":"Portland",
    "state":"OR",
    "image":"/images/east-end.jpg",
    "lat":"45.521391",
    "lng":"-122.660949",
    "A":"",
    "B":"",
    "C":""
  },
  {
    "markerId":"10",
    "name":"Grand Cafe\n",
    "url":"http://www.grandcafepdx.com/",
    "type":"Restaurant",
    "address":"832 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/grand-cafe.jpg",
    "lat":"45.51665",
    "lng":"-122.660404",
    "A":"",
    "B":"",
    "C":""
  },
  {
    "markerId":"11",
    "name":"Green Dragon Bistro & Brew",
    "url":"http://www.pdxgreendragon.com/",
    "type":"Brewery/Bar",
    "address":"928 Southeast 9th Avenue",
    "city":"Portland",
    "state":"OR",
    "image":"/images/green-dragon.jpg",
    "lat":"45.515956",
    "lng":"-122.65644",
    "A":"A y p",
    "B":" +",
    "C":""
  },
  {
    "markerId":"12",
    "name":"Hair of the Dog Brewing",
    "url":"http://www.hairofthedog.com/",
    "type":"Brewery",
    "address":"61 Southeast Yamhill Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/hair-of-the-dog.jpg",
    "lat":"45.515992",
    "lng":"-122.665549",
    "A":"",
    "B":" +",
    "C":""
  },
  {
    "markerId":"13",
    "name":"Holocene",
    "url":"http://www.holocene.org/",
    "type":"Dance",
    "address":"1001 Southeast Morrison Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/holocene.jpg",
    "lat":"45.517574",
    "lng":"-122.655328",
    "A":" l",
    "B":"",
    "C":""
  },
  {
    "markerId":"14",
    "name":"J & M Cafe",
    "url":"http://www.jandmcafepdx.com/",
    "type":"Bar",
    "address":"537 Southeast Ash Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/jm-cafe.jpg",
    "lat":"45.521815",
    "lng":"-122.659916",
    "A":"",
    "B":"",
    "C":"l"
  },
  {
    "markerId":"15",
    "name":"C'est Si Bon ",
    "url":"http://www.cestsibonpdx.com/",
    "type":"Wine",
    "address":"22 NE 7th Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/cest-si-bon.jpg",
    "lat":"45.523376",
    "lng":"-122.658483",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"16",
    "name":"La Bistro Montage",
    "url":"http://www.montageportland.com/",
    "type":"Restaurant",
    "address":"301 SE Morrison St",
    "city":"Portland",
    "state":"OR",
    "image":"/images/bistro-montage.jpg",
    "lat":"45.517444",
    "lng":"-122.662623",
    "A":"D",
    "B":"",
    "C":""
  },
  {
    "markerId":"17",
    "name":"Morrison Hotel",
    "url":"http://www.mohobar.com/",
    "type":"Bar",
    "address":"719 Southeast Morrison Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/morrison.jpg",
    "lat":"45.517393",
    "lng":"-122.658065",
    "A":"A y p",
    "B":"",
    "C":""
  },
  {
    "markerId":"18",
    "name":"My Father's Place",
    "url":"http://www.myfathersplacepdx.com/",
    "type":"Dive",
    "address":"523 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/my-fathers-place.jpg",
    "lat":"45.518818",
    "lng":"-122.660922",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"19",
    "name":"New Deal Tasting Room",
    "url":"http://www.newdealdistillery.com/the-new-deal-tasting-room/",
    "type":"Bar",
    "address":"900 Southeast Salmon Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/new-deal.jpg",
    "lat":"45.51417",
    "lng":"-122.656472",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"20",
    "name":"Nicholas Restaurant",
    "url":"http://nicholasrestaurant.com/",
    "type":"Restaurant",
    "address":"318 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/nicholas-restaurant.jpg",
    "lat":"45.520472",
    "lng":"-122.66041",
    "A":"D",
    "B":"",
    "C":""
  },
  {
    "markerId":"21",
    "name":"Pacific Pie Co",
    "url":"http://www.pacificpie.com/",
    "type":"Restaurant",
    "address":"1520 SE 7th Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/pacific-pie-co.jpg",
    "lat":"45.511831",
    "lng":"-122.658399",
    "A":"A y D",
    "B":"",
    "C":"l"
  },
  {
    "markerId":"22",
    "name":"Produce Row Cafe",
    "url":"http://www.producerowcafe.com/",
    "type":"Craft Beers",
    "address":"204 Southeast Oak Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/produce-row-cafe.jpg",
    "lat":"45.519941",
    "lng":"-122.663541",
    "A":"A y",
    "B":" +",
    "C":"P"
  },
  {
    "markerId":"23",
    "name":"Rontoms",
    "url":"http://www.rontoms.net/",
    "type":"Bar",
    "address":"600 East Burnside Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/rontoms.jpg",
    "lat":"45.522535",
    "lng":"-122.659492",
    "A":"A y",
    "B":"",
    "C":"P C"
  },
  {
    "markerId":"24",
    "name":"Rum Club",
    "url":"http://www.rumclubpdx.com/",
    "type":"Bar",
    "address":"720 SE Sandy Blvd",
    "city":"Portland",
    "state":"OR",
    "image":"/images/rum-club.jpg",
    "lat":"45.518985",
    "lng":"-122.657896",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"25",
    "name":"Sassy's Bar & Grill",
    "url":"http://www.sassysbar.com/",
    "type":"Dive/Strip Club",
    "address":"927 Southeast Morrison Bridge",
    "city":"Portland",
    "state":"OR",
    "image":"/images/sassys.jpg",
    "lat":"45.517337",
    "lng":"-122.656052",
    "A":"A y l",
    "B":"",
    "C":""
  },
  {
    "markerId":"26",
    "name":"Fausse Piste",
    "url":"http://www.faussepiste.com/index.html",
    "type":"Wine Bar",
    "address":"537 SE Ash St #102",
    "city":"Portland",
    "state":"OR",
    "image":"/images/fausse-piste.jpg",
    "lat":"45.521815",
    "lng":"-122.659916",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"27",
    "name":"Sizzle Pie",
    "url":"http://www.sizzlepie.com/",
    "type":"Bar",
    "address":"624 East Burnside Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/sizzle-pie.jpg",
    "lat":"45.522745",
    "lng":"-122.65907",
    "A":"D",
    "B":"",
    "C":""
  },
  {
    "markerId":"28",
    "name":"Slow Bar",
    "url":"http://slowbar.net/",
    "type":"Bar",
    "address":"533 Southeast Grand Avenue",
    "city":"Portland",
    "state":"OR",
    "image":"/images/slow-bar.jpg",
    "lat":"45.518772",
    "lng":"-122.661048",
    "A":"A y ",
    "B":"",
    "C":""
  },
  {
    "markerId":"29",
    "name":"Speakeasy Tavern",
    "url":"http://gils-speakeasy.com/",
    "type":"Bar",
    "address":"609 Southeast Taylor Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/speakeasy-tavern.jpg",
    "lat":"45.515324",
    "lng":"-122.659385",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"30",
    "name":"Spirit of 77",
    "url":"http://www.spiritof77bar.com/",
    "type":"Sports",
    "address":"500 NE Martin Luther King Jr Blvd",
    "city":"Portland",
    "state":"OR",
    "image":"/images/spirit-of-77.jpg",
    "lat":"45.526734",
    "lng":"-122.661374",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"31",
    "name":"Star Bar",
    "url":"http://star-bar-rocks.com/",
    "type":"Lounge",
    "address":"639 Southeast Morrison Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/star-bar.jpg",
    "lat":"45.517438",
    "lng":"-122.658919",
    "A":"A y l p",
    "B":"",
    "C":""
  },
  {
    "markerId":"32",
    "name":"The Lovecraft Bar",
    "url":"http://thelovecraftbar.com/",
    "type":"Theme Dance Club",
    "address":"421 SE Grand Ave",
    "city":"Portland",
    "state":"OR",
    "image":"/images/lovecraft-bar.jpg",
    "lat":"45.519961",
    "lng":"-122.660948",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"33",
    "name":"The Side Door",
    "url":"http://thesidedoorpdx.com/",
    "type":"Restaurant/Deli",
    "address":"425 Southeast Washington Street",
    "city":"Portland",
    "state":"OR",
    "image":"/images/side-door.jpg",
    "lat":"45.518812",
    "lng":"-122.661173",
    "A":"r D",
    "B":"",
    "C":"l"
  },
  {
    "markerId":"34",
    "name":"The Wurst",
    "url":"http://thewurstpdx.com/#",
    "type":"Bar",
    "address":"724 E Burnside St",
    "city":"Portland",
    "state":"OR",
    "image":"/images/the-wurst.jpg",
    "lat":"45.522752",
    "lng":"-122.658001",
    "A":"A y",
    "B":"",
    "C":""
  },
  {
    "markerId":"35",
    "name":"Upright Brewing",
    "url":"http://www.uprightbrewing.com/",
    "type":"Brewery",
    "address":"240 North Broadway #2",
    "city":"Portland",
    "state":"OR",
    "image":"/images/upright-brewing.jpg",
    "lat":"45.534678",
    "lng":"-122.668154",
    "A":"",
    "B":" +",
    "C":""
  },
  {
    "markerId":"36",
    "name":"Vie de Boheme",
    "url":"http://www.viedebohemepdx.com/",
    "type":"Bar",
    "address":"1530 Southeast 7th Avenue",
    "city":"Portland",
    "state":"OR",
    "image":"/images/vie-de-boheme.jpg",
    "lat":"45.511639",
    "lng":"-122.658401",
    "A":"A y",
    "B":"",
    "C":""
  }
]

var mapApp = angular.module('mapControllers', []);
 
 mapApp.controller('ListController', function ($scope, $http) {
   $http.get('scripts/bars.json').
    success(function(data, status, headers, config) {
      $scope.bars = data;

    var myLatlng100 = new google.maps.LatLng(45.523007, -122.657890);

    var mapOptions = {
            center: myLatlng100,
            styles: [{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
            zoom: 15,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: false
             
    };

    // Create a renderer for directions and bind it to the map.
    var rendererOptions = {
        map: $scope.map
    }
    var directionsDisplay;
    var directionsService;
    directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap($scope.map);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
     
    var createMarker = function (bar){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(bar.lat, bar.lng),
            title: bar.name
        });
   
            marker.content = '<div class="contentString"><img src="' + 
            bar.image +
            '"><br/>'+ 
            bar.address +
            ' ' +  
            '<br /><button id="spinner" class="button" onclick="getDir('+bar.lat+', '+bar.lng+')">Get Directions</button>' +
            '</div>';
            marker.image = bar.image;
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<a class="info-window" href="' + bar.url + '">' +'<h3 class="info-window" >' + bar.name + '</h3>' + '</a>' +  marker.content);
            infoWindow.open($scope.map, marker);
        });
        google.maps.event.addListener(marker, 'dragstart', function() {
            disableMovement(true);
        });

        google.maps.event.addListener(marker, 'dragend', function() {
            disableMovement(false);
        });
        
        $scope.markers.push(marker);
   
      }
    
    for (var i = 0; i < $scope.bars.length; i++){
        createMarker($scope.bars[i]);
    }
    function clearMarkers(map){
        function setAllMap(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }
        for(var i=0; i < markers.length; i++){
          markers[i].setMap(null);
        }
    };
    
    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    };
    

    }).
    error(function(data, status, headers, config) {
      console.log("Did not compute");
    });
})
         
function disableMovement(disable) {
    var mapOptions;
    if (disable) {
        mapOptions = {
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: false
        };
    } else {
        mapOptions = {
            draggable: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            zoomControl: true
        };
    }
    map.setOptions(mapOptions);
}
function getDir(lat,lng,markers,map) {
    run_waitMe();
    document.getElementById("panel").innerHTML = " ";

      if (navigator.geolocation) { //Checks if browser supports geolocation          
          navigator.geolocation.getCurrentPosition(function (position) {  //This gets the
          var latitude = position.coords.latitude;                       //users current
          var longitude = position.coords.longitude;                    //location
          var start = new google.maps.LatLng(latitude, longitude);     //Creates variable for map coordinates
             
        
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));

        var request = {
          origin: start,
          destination: new google.maps.LatLng(lat, lng),
          travelMode: google.maps.DirectionsTravelMode.TRANSIT
        };
       
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
                $('.waitMe').hide();
                $('h3.map').hide();
                $('#clearPanel').show();
                }
        });
      });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}
function handleNoGeolocation(errorFlag) {
          if (errorFlag) {
            var content = 'Error: The Geolocation service failed.';
          } else {
            var content = 'Error: Your browser doesn\'t support geolocation.';
          }

          var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
          };

          var infowindow = new google.maps.InfoWindow(options);
          map.setCenter(options.position);
        
}

// none, bounce, rotateplane, stretch, orbit, 
// roundBounce, win8, win8_linear or ios
var current_effect = 'bounce'; // 

function run_waitMe(effect){
    $('#spinHere').waitMe({

    //none, rotateplane, stretch, orbit, roundBounce, win8, 
    //win8_linear, ios, facebook, rotation, timer, pulse, 
    //progressBar, bouncePulse or img
    effect: 'bounce',

    //place text under the effect (string).
    text: 'Getting Directions',

    //background for container (string).
    bg: 'rgba(255,255,255,0.7)',

    //color for background animation and text (string).
    color: '#000',

    //change width for elem animation (string).
    sizeW: '',

    //change height for elem animation (string).
    sizeH: '',

    // url to image
    source: ''

    });
    }

 function clearPanel(){
   document.getElementById("panel").innerHTML = " ";
  $('h3.map').show();
  $('#clearPanel').hide();
};
 