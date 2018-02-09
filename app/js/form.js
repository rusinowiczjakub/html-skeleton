
var month = $('select[name=month]');
var day = $('select[name=day]');
var currentYear = new Date();
var form = $('.reservation-form');
var respMessage;
var dateToSend;
var hourElements;

$(document).ready(function() {
  month.empty();
  day.empty();

  for (var i = 0; i <= 12; i++) {

    if (i === 0) {
      month.append('<option value=>' + 'Wybierz miesiąc' + '</option>');
      continue;
    }

    month.append('<option value=' + i + '>' + i + '</option>');
  }

  month.change(function() {
    day.empty()

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

  day.change(function() {

    $('p[data-hour-time]').fadeOut(500, function () {
      $(this).remove()
    });
    $('.choose-hour').fadeOut(500, function () {
        $(this).remove()
    });

    var data = {
      days: day.val(),
      months: month.val()
    };

    $.ajax({
      url: 'src/reservationAvailability.php',
      type: 'GET',
      data: data,
      success: function(response) {

        $('.resp-message').remove();
        var resp = $.parseJSON(response);

        if (resp.status === 0) {
          var respMessage = $('<p class="resp-message">' + resp.message + '</p>');

          respMessage.hide();
          respMessage.insertAfter(form);
          respMessage.fadeIn(300);

        } else {

          var headerTag = $('<h3 class="choose-hour"> Wybierz godzinę: </h3>');
          // headerTag.insertBefore(respMessage);

          var hoursDiv = $('.hoursDiv');

          headerTag.hide();
          headerTag.insertAfter(form);
          headerTag.fadeIn(300);

          resp.data.forEach(function(el, index) {

            var date = new Date(el.date)
            var hours =  date.getHours()<10? '0'+date.getHours() : + date.getHours();
            var minutes = date.getMinutes()<10? '0'+date.getMinutes() : + date.getMinutes();

            respMessage = $('<p data-hour-time="'+ hours + ':' + minutes +'"">'+ hours + ':' + minutes +'</p>');
            respMessage.appendTo(hoursDiv);
          });

        }

      }

    });

    setTimeout(function () {

      hourElements = $('.hoursDiv > p');

      hourElements.on('click', function(event) {

        clickedElement = $(event.target);
        clickedElement.siblings().css('color', '');
        clickedElement.siblings().css('font-size', '');

        clickedElement.css('color', 'rgba(41, 128, 185, 1)');
        clickedElement.css('font-size', '1.1rem');

        dateToSend = new Date('2018-'+month.val()+'-'+day.val()+" " +clickedElement.context.dataset.hourTime);

        var email = $('input[name=email]').val();
        var name = $('input[name=name]').val();
        var phone = $('input[name=phone]').val();

        var reservationData = {
          date: dateToSend,
          phone: phone,
          name: name,
          email: email,
        }

        $('.submit').click(function () {

          $.ajax({
            url: 'src/reservationAvailability.php',
            type: 'POST',
            data: reservationData,
          })
          .done(function() {
            console.log("success");
          })
          .fail(function() {
            console.log("error");
          })
          .always(function() {
            console.log("complete");
          });

        });

      });

    }, 50);

  });

});
