if (document.querySelector('.slider')) {
	new Swiper('.swiper', {
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		grabCursor: true,
		spaceBetween: 14,
		slidesPerView: 1,
		watchOverflow: true,
		breakpoints: {
			420: {
				slidesPerView: 2,
			},
			575: {
				slidesPerView: 3,
			},
			992: {
				slidesPerView: 5,
			}
		},
	});
}
