
$(window).on('load resize', function () {
    if (document.documentElement.clientWidth < 700) {
        $('.ready-model h2').insertBefore('.ready-model__wrapper');
    } else {
        $('.ready-model h2').insertBefore('.ready-model__video_btn');
    }
});
