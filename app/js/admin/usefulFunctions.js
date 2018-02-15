function changeContent(callback) {
    var contentPlace = $('#contentPlace');

    contentPlace.animate({opacity: 0, top: "-100px"}, 600, null, function() {
        $(this).empty();
    });

    callback();
}
