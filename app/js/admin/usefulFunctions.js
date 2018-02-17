function changeContent(callback) {
    var contentPlace = $('#contentPlace');
    contentPlace.removeAttr('style');
    contentPlace.empty();
    contentPlace.animate({opacity: 1, top: "0px"}, 600, null, function() {
    });

    callback();
}


// function 
