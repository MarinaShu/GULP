function mobileMenuToggle() {
    const
        mobileBurger = $('.burger'),
        mobileClose = $('.mobile-menu .close'),
        mobileBody = $('.mobile-menu__wrapper'),
        mobileWrapper = $('.mobile-menu'),
        overlay = $('.mobile-menu .overlay');

    function burgerOpen() {
        mobileWrapper.fadeIn(300);
        mobileBurger.addClass('open');
        scrollController.disabledScroll();
        setTimeout(function () {
            mobileBody.addClass('active');
        }, 100);
    }

    const burgerClose = () => {



        mobileWrapper.fadeOut(300);
        scrollController.startScroll();
        mobileBurger.removeClass('open');
        $('.mob-tabs').removeClass('active');
        mobileBody.removeClass('active');

    }

    function burger() {
        if (mobileBurger.hasClass('open')) {
            burgerClose();
        } else {
            burgerOpen();
        }
    }
    mobileBurger.on('click', burger);
    overlay.on('click', burgerClose);
    mobileClose.on('click', burgerClose);
    checkingMatchMedia(992, burgerClose, burgerClose);

} mobileMenuToggle();