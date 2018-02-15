$(document).ready(function(){

    var navbar = $('.navbar-collapse');
    var hamburger = $('.fa.fa-bars');
    var xClose = $('.fa.fa-times');
    var navElem = $('li a');

    // navElem.on('click', function() {
    //
    //     $('html, body').animate({
    //         scrollTop: $($(this).attr('href')).offset().top
    //     }, 800);
    // });

    navElem.on('click', function() {
        navbar.css('width', '0')
        hamburger.animate({'height': '60px'}, 800);
        xClose.animate({'height': '0'})
    });
});
