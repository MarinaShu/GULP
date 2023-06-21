const scrollController = {
    fScrollTop: $('html'),
    disabledScroll() {
        let scrolled = $(window).scrollTop();
        localStorage.setItem('whiteOrchidScrollTop', scrolled);
        scrollController.fScrollTop.scrollTop(scrolled);

        let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        scrollController.fScrollTop.css({
            overflow: "hidden",
            paddingRight: `${scrollWidth}px`,
        });
    },
    startScroll() {
        scrollController.fScrollTop.removeAttr('style');
        setTimeout(() => {
            localStorage.removeItem('whiteOrchidScrollTop');
        }, 200);
    }
}
	//scrollController.startScroll();
	//scrollController.disabledScroll();