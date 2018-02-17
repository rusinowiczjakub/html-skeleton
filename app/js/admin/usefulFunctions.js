function changeContent(callback) {
    var contentPlace = $('#contentPlace');
    contentPlace.removeAttr('style');
    contentPlace.empty();
    contentPlace.animate({opacity: 1, top: "0px"}, 600, null, function() {
    });

    callback();
}


function sortDatesByMonth(datesArray)
{
    var months = [
        "styczeń",
        "luty",
        "marzec",
        "kwiecień",
        "maj",
        "czerwiec",
        "lipiec",
        "sierpień",
        "wrzesień",
        "październik",
        "listopad",
        "grudzień",
    ]

    // for (var i = 0; i <= datesArray.length; i++) {
    //     var month = new Date(datesArray[i]);
    //     var allTerms = [
    //         months[i] =>
    //     ]
    // }
}
