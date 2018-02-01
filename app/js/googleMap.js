var map;
var lukasinskiego;
var service;

var placeType;

function chooseType(element) {
  placeType = element.dataset.type
  initMap();
}

function initMap() {
  lukasinskiego = {lat: 51.7369893, lng: 19.4699291};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: lukasinskiego
  });

  var image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
     // This marker is 20 pixels wide by 32 pixels high.
     size: new google.maps.Size(20, 32),
     // The origin for this image is (0, 0).
     origin: new google.maps.Point(0, 0),
     // The anchor for this image is the base of the flagpole at (0, 32).
     anchor: new google.maps.Point(0, 32)
   };

  var marker = new google.maps.Marker({
    title: 'Nasz aparatament',
    position: lukasinskiego,
    icon: image,
    map: map
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: lukasinskiego,
    radius: 1000,
    type: placeType
  }, callback);
}

// google.maps.event.addDomListener(window, 'load', initialize);

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
}
