$(document).ready(function(){

    var navbar = $('.navbar-collapse');
    var hamburger = $('.fa.fa-bars');
    var xClose = $('.fa.fa-times');

    hamburger.click(function () {
      navbar.css('width', '100%')
      hamburger.animate({'height': '0'}, 500)
      xClose.animate({'height': '60px'})
    });

    xClose.click(function() {
      navbar.css('width', '0')
      hamburger.animate({'height': '60px'}, 800);
      xClose.animate({'height': '0'})
    });

});
