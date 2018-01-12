$(document).ready(function(){

    var nav = $('.navbar-collapse>ul');
    var navbar = $('.navbar-collapse');

    $('nav i').click(function () {
        if ($(this).hasClass('fa-bars')){

            $(this).removeClass('fa-bars');
            $(this).addClass('fa-times');
            $(this).css('color', 'black');

        } else {
            $(this).removeClass('fa-times');
            $(this).addClass('fa-bars');
        }
        if(nav.hasClass('navbar-hidden')) {
            nav.removeClass('navbar-hidden');
            navbar.css('background-color', 'rgba(255, 255, 255, 1)');
        } else {
            nav.addClass('navbar-hidden');
            navbar.css('background-color', 'rgba(255, 255, 255, 0)');
        }

    });


});