$(document).ready(function() {
    // var element = $('.single__cost');
    // var scrollBottom = $(window).scrollTop() + $(window).height();
    // element.hide();
    //
    // console.log(element.height());
    // if (element.isOnScreen()) {
    //     $.each(element, function(index, value) {
    //        $(value).fadeIn(3000);
    //     });
    // }
});

$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};