
function addClassHeaderScroll() {
    // Уменьшить header
    const header = $('header');

    scrollPrev = 0;

    $(window).on('load scroll', function () {
        const scrolled = $(window).scrollTop();

        if (scrolled > 15 && scrolled > scrollPrev) {
            header.addClass('active');
        }

        scrollPrev = scrolled;
        if (scrolled < 16) {
            header.removeClass('active');

        }
    });

} addClassHeaderScroll();