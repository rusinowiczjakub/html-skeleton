$(document).ready(function() {
  var sect = $('.section__content-description');
  var button =  $('.btn-map');
  var map = $('#map');
  var mapControl = $('#map-control');

  button.click(function() {
    if (map.css('display') == 'none') {
      map.css('display', 'block');
      mapControl.css('display', 'block');
      button.css('background', 'linear-gradient(to right, rgba(103, 178, 111, .4), rgba(76, 162, 205, .4))');
      button.css('color', 'white');
      button.text('Ukryj mapę');
      sect.css('padding-bottom', '0');
      initMap();
    } else {
      map.css('display', 'none');
      mapControl.css('display', 'none');
      button.css('background', 'rgba(0, 0, 0, 0)');
      button.css('color', 'rgb(41, 128, 185)');
      button.text('Pokaż mapę');
      sect.css('padding-bottom', '70px');
    }
  })

});
