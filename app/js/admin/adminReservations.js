var actionLink = $('#reservations');
var contentPlace = $('#contentPlace');
var monthDict = [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
]

var monthsArray = [];


$(document).ready(function() {
    actionLink.click(function() {
        contentPlace.empty();
        changeContent(function() {
            $.ajax({
                url: 'src/reservedTerms.php',
                type: 'GET',
                dataType: 'json',
            })
            .done(function(resp) {
                // console.log(resp);
                if (resp.status == 0) {
                    contentPlace.html('<h1>Brak rezerwacji</h1>');
                } else {
                    $.ajax({
                        url: 'html/reservations.html',
                        type: 'GET',
                        dataType: 'html'
                    })
                    .done(function (html) {
                        initEmptyMonthsArrays();
                        $(contentPlace).append(html);

                        $.each(resp.data, function(index, el) {
                            var termMonth = new Date(el.date);
                            monthsArray[termMonth.getMonth()].push(el);
                            // console.log(monthsArray);
                            getElementsByMonth(monthsArray);
                        });
                    });
                }
            });
        });
    });
})


function getElementsByMonth(monthsArray) {
    for (var i = 0; i < monthDict.length; i++) {
        if (monthsArray[i].length < 1) {
            $('#'+monthDict[i]).append(
            '<br><h4>Brak rezerwacji</h4><br>'
            );
        } else {
            if (monthsArray[i].length == 1) {
                $('#'+monthDict[i]).append(
                '<br><h4>'+monthsArray[i].length+'</h4>'+
                '<h4>rezerwacja</h4>'+
                '<button class="btn btn-outline" data-month='+monthDict[i]+'>Wyświetl</button>'
                );
            } else {
                $('#'+monthDict[i]).append(
                '<br><h4>'+monthsArray[i].length+'</h4>'+
                '<h4>rezerwacji</h4>'+
                '<button class="btn btn-outline">Wyświetl</button>'
                );
            }
        }
    }
}

function initEmptyMonthsArrays()
{
    for (var i = 0; i <= 11; i++) {
        monthsArray[i] = [];
    }

    return monthsArray;
}
