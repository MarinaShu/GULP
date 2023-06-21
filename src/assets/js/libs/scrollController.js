const scrollController = {
    fScrollTop: $('html'),
    disabledScroll() {
        let scrolled = $(window).scrollTop();
        localStorage.setItem('liftScrollTop', scrolled);
        scrollController.fScrollTop.scrollTop(scrolled);

        let scrollWidth = window.innerWidth - document.documentElement.clientWidth;

        scrollController.fScrollTop.css({
            overflow: "hidden",
            paddingRight: `${-scrollWidth}px`
        });

        if (isMobile == false) {
            $('body, header').css({
                paddingRight: `8px`
            });
        }
    },

    startScroll() {
        scrollController.fScrollTop.removeAttr('style');
        $('body, header').removeAttr('style');
        localStorage.removeItem('liftScrollTop');
    }
}
//scrollController.startScroll();
//scrollController.disabledScroll();
//body: overflow-x: hidden;