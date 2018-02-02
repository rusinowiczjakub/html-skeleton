var map;
var lukasinskiego;
var service;

var placeType = 'shit';

function chooseType(element) {
  placeType = element.dataset.type
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: lukasinskiego,
    radius: 1000,
    type: placeType
  }, callback);
  initMap();
}

function initMap() {
  lukasinskiego = {lat: 51.7369893, lng: 19.4699291};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: lukasinskiego,
    gestureHandling: true,
    zoomControl: true,
    disableDefaultUI: true
  });

  var marker = new google.maps.Marker({
    title: 'Nasz aparatament',
    position: lukasinskiego,
    icon: '/placeholder.png',
    map: map
  });
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
