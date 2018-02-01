$(document).ready(function() {
  var month = $('select[name=month]');
  var day = $('select[name=day]');
  var currentYear = new Date();

  console.log(currentYear.getFullYear());
  month.change(function() {
    day.empty();
    if (month.val() <= 7) {
      if (month.val() % 2 == 0 && month.val() !== 2 ) {
        for (var i = 1; i <= 30; i++) {
          day.append('<option value=' + i + '>' + i + '</option>');
        }
      }

      if (month.val() % 2 !== 0) {
        for (var i = 1; i <= 31; i++) {
          day.append('<option value=' + i + '>' + i + '</option>');
        }
      }
    } else {
      if (month.val() % 2 == 0 && month.val() !== 2 ) {
        for (var i = 1; i <= 31; i++) {
          day.append('<option value=' + i + '>' + i + '</option>');
        }

      if (month.val() % 2 !== 0) {
        for (var i = 1; i <= 31; i++) {
          day.append('<option value=' + i + '>' + i + '</option>');
        }
      }

    }

    if (month.val() == 2 && currentYear % 4 == 0) {
      for (var i = 1; i <= 29; i++) {
        day.append('<option value=' + i + '>' + i + '</option>');
      }
    }

    if (month.val() == 2 && currentYear % 4 !== 0) {
      for (var i = 1; i <= 28; i++) {
        day.append('<option value=' + i + '>' + i + '</option>');
      }
    }


  });
  for (var i = 1; i <= 12; i++) {
    month.append('<option value=' + i + '>' + i + '</option>');
  }
});
