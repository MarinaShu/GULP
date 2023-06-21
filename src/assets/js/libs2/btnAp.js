// Подключаем кнопку наверх

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1000) {
            $('#buttonUp').fadeIn();
        } else {
            $('#buttonUp').fadeOut();
        }
    });

    $('#buttonUp').click(function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
});