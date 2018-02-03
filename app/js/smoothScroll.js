$(document).ready(function(){
    $("li a").on('click', function() {

            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top
            }, 800);
    });

    console.log($('.arrow-scroll'));

    // $("li a").click(function(e) {
    //     e.preventDefault();
    //     $('html, body').animate({
    //         scroll: $(this).offset()
    //     }, 2000, 'linear');
    // });
    // $('a[href^="#"]').on('click',function (e) {
    //     e.preventDefault();
    //
    //     var target = this.hash;
    //     var $target = $(target);
    //
    //     $('html, body').stop().animate({
    //         'scrollTop': $target.offset().top
    //     }, 900, 'swing')
    // });
});
