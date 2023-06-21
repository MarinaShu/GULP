const overlayBurger = $('.durger__overlay'),
    burgerBtn = $('#burger'),
    burgerBody = $('.header__info');

// открытие burger
burgerBtn.click(function () {
    if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        burgerBody.removeClass('open');
        $('main').removeClass(blurred);
        startScroll();
        overlayBurger.fadeOut(500);
    } else {
        $(this).addClass('open');
        burgerBody.addClass('open');
        setTimeout(function () {
            $('main').addClass(blurred);
            stopScroll();
            overlayBurger.fadeIn(500);
        }, 500);
    }
});

overlayBurger.click(function () {
    burgerBtn.trigger('click');
});
