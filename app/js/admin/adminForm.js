var singleTermLink = $('#singleTermAdd');
var contentPlace = $('#contentPlace');

$(document).ready(function() {

    singleTermLink.click(function() {
        contentPlace.empty();
        $.ajax({
            url: 'html/addTermForm.html',
            type: 'GET',
            dataType: 'html'
        })
        .done(function(data) {
            contentPlace.html(data).animate({opacity: '1', top: '0'}, 600);
        });


            var month = $('select[name=month]');
            var day = $('select[name=day]');

            month.change(function() {
                  day.empty()

                  if (month.val() === 0) {
                      day.empty();
                  }

                  if (month.val() <= 7) {

                    if (month.val() == 2) {

                      for (var i = 0; i <= 28; i++) {

                        if (i === 0) {
                            day.append('<option value=>' + 'Wybierz dzień' + '</option>');
                            continue;
                        }

                          day.append('<option value=' + i + '>' + i + '</option>');
                      }

                      return;
                    }

                    if (month.val() % 2 == 0 && month.val() != 2) {

                      for (var i = 0; i <= 30; i++) {
                        if (i === 0) {
                            day.append('<option value=>' + 'Wybierz dzień' + '</option>');
                            continue;
                        }
                          day.append('<option value=' + i + '>' + i + '</option>');
                      }

                      return;
                    } else {

                      for (var i = 0; i <= 31; i++) {

                        if (i === 0) {
                            day.append('<option value=>' + 'Wybierz dzień' + '</option>');
                            continue;
                        }

                          day.append('<option value=' + i + '>' + i + '</option>');
                      }
                      return;
                    }
                  }

                  if (month.val() > 7) {

                    if (month.val() % 2 == 0) {

                      for (var i = 0; i <= 31; i++) {

                          if (i === 0) {
                              day.append('<option value=>' + 'Wybierz dzień' + '</option>');
                              continue;
                          }

                          day.append('<option value=' + i + '>' + i + '</option>');
                      }

                    } else {

                      for (var i = 0; i <= 30; i++) {

                        if (i === 0) {
                            day.append('<option value=>' + 'Wybierz dzień' + '</option>');
                            continue;
                        }

                          day.append('<option value=' + i + '>' + i + '</option>');
                      }

                    }
                }
            });
    });
});


function generateHours(){
    for (var i = 1; i <= 24; i++) {
        console.log("0"+i)
    }
}
