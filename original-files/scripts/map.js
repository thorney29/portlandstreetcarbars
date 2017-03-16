var map;
var markers = []; //added
var contentString;
var lat;
var lng;
var title;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();


var infowindow;
(function () {

  google.maps.Map.prototype.markers = new Array();
    
  google.maps.Map.prototype.addMarker = function(marker) {
    this.markers[this.markers.length] = marker;
  };
    
  google.maps.Map.prototype.getMarkers = function() {
    return this.markers;
  };
    
  google.maps.Map.prototype.clearMarkers = function() {
    if(infowindow) {
      infowindow.close();
    }
    
    for(var i=0; i < this.markers.length; i++){
      this.markers[i].set_map(null);
    }
  };
})(); 

function initialize() {

  var myLatlng100 = new google.maps.LatLng(45.522535,-122.659492);
  var mapOptions = {
        center: myLatlng100,
        zoom: 15,
        mapTypeControl: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        }
  };
 map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  var transitLayer = new google.maps.TransitLayer();
  transitLayer.setMap(map);

  $.getJSON('https://spreadsheets.google.com/feeds/list/0AnAPtHOSNeZvdHBpcU1NemZ5UFJaOXZDMXlBUVdnMWc/od6/public/values?alt=json',       
  function(data) {
      for (var i = 0; i < data.feed.entry.length; i++) {
          var markerId = data.feed.entry[i].gsx$markerid.$t;
          var lat = data.feed.entry[i].gsx$lat.$t;
          var lng = data.feed.entry[i].gsx$lng.$t;
          var title = data.feed.entry[i].gsx$name.$t;
          var image = data.feed.entry[i].gsx$image.$t;
          var contentString = "<img src='" + data.feed.entry[i].gsx$image.$t + "'/><a href='" + data.feed.entry[i].gsx$url.$t + "'><div class='contentString'><h3 id='listGroup_BoxName'>" + data.feed.entry[i].gsx$name.$t + "</h3></a><br><p>" + data.feed.entry[i].gsx$address.$t 
              + "<br>" + data.feed.entry[i].gsx$city.$t + ", "
              + data.feed.entry[i].gsx$state.$t + "</p></div>" + "<input class="mapButton" type='button' onClick='getDir("+lat+","+lng+")' value='Get direction here'>";          
                
          var markers = [markerId, image, lat, lng, title, contentString];
          createMarker(lat, lng, title, contentString);

      }  
  });
} 

function createMarker(lat, lng, title, contentString) {
     
    var coordinates = new google.maps.LatLng(lat, lng);
    var image  =  '../images/map-marker-hi.png';
    var marker = new google.maps.Marker({
      position: coordinates,
       map: map,
      icon: image,
      title: name,
      visible: true
    });

    google.maps.event.addListener(marker, "click", function() {
      if (infowindow) {
        infowindow.close();
      } 
    infowindow = new google.maps.InfoWindow({content: contentString});
      infowindow.open(map, marker);
    });
     
    markers.push(marker); 
  
};

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

function resetMap(map) {
    initialize();
    document.getElementById('panel').innerHTML="";
 
};

function getDir(lat,lng) {
 
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
               clearMarkers(map);
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

function activateMarker(lat, lng, map) {
    getDir(lat,lng);
  }

  
google.maps.event.addDomListener(window, 'load', initialize);

 

 
           
  