var map;
var lukasinskiego;
var service;

function initMap() {
  lukasinskiego = {lat: 51.7369893, lng: 19.4699291};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: lukasinskiego
  });
  var marker = new google.maps.Marker({
    position: lukasinskiego,
    map: map
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: lukasinskiego,
    radius: 1000,
    type: 'store'
  }, callback);
}

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
    setMap : map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
