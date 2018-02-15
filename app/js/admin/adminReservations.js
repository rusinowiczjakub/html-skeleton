var actionLink = $('#reservations')
var contentPlace = $('#contentPlace')

$(document).ready(function() {
    actionLink.click(function() {
        changeContent(function() {
            $.ajax({
                url: 'src/reservedTerms.php',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(resp) {
                console.log(resp);
                if (resp.status == 1) {
                    contentPlace.html('<h1>Brak rezerwacji</h1>').animate({opacity: '1', top: '0'}, 600);
                }
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });

        });
    });
})
