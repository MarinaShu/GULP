
function showHeaderWhenScrolling() {
    // Показ и скрытие header
    const header = $('header');
    let windowHeight = window.pageYOffset;
    scrollPrev = 0;

    $(window).on('ready load scroll', function () {
        const scrolled = $(window).scrollTop();

        if (windowHeight > 100) {
            header.addClass('hide');
            $('.header__link').removeClass('active');
        }

        // if ((windowHeight > 100) || (scrolled > 15 && scrolled > scrollPrev)) {
        if (scrolled > 15 && scrolled > scrollPrev) {
            header.addClass('hide');
            $('.header__link').removeClass('active');
        } else {
            header.removeClass('hide');
        }

        scrollPrev = scrolled;
        if (scrolled < 60) {
            header.removeClass('active');
        } else {
            header.addClass('active');
        };

    });

} showHeaderWhenScrolling();