$(function () {

	const scrollController = {
		fScrollTop: $('html'),
		header: $('header'),
		disabledScroll() {
			let scrolled = $(window).scrollTop();
			localStorage.setItem('whiteOrchidScrollTop', scrolled);
			scrollController.fScrollTop.scrollTop(scrolled);

			let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
			scrollController.header.css({
				paddingRight: `${scrollWidth}px`
			});
			scrollController.fScrollTop.css({
				overflow: "hidden",
				paddingRight: `${scrollWidth}px`
			});

		},
		startScroll() {
			scrollController.fScrollTop.removeAttr('style');
			scrollController.header.removeAttr('style');
			setTimeout(() => {
				localStorage.removeItem('whiteOrchidScrollTop');
			}, 200);
		}
	}
	//scrollController.startScroll();
	//scrollController.disabledScroll();

	const
		btnOpenPopup = $('.js-popup'),
		popupBody = $('.popup'),
		btnClose = $('.popup .close'),

		title = $('.popup .form-content_title'),
		subtitle = $('.popup .form-content_descr'),
		btn_title = $('.popup .form__submit .btn');

	//открытия попапа
	function popupOpen(event) {

		//*получаю массив значений для попапа
		let arrayValuePopup = $(this).data('settings');
		arrayValuePopup = JSON.parse(atob(arrayValuePopup));

		const paste = arrayValuePopup.paste;
		const hidden = arrayValuePopup.hidden;
		const required = arrayValuePopup.required;
		const section_class = arrayValuePopup.section_class;

		//*скрывает все поля
		popupBody.find('.form__field')
			.addClass('d-hide')
		// .find('input, textarea').prop("readonly", true);

		//*добовляет поля
		$.each(paste, function (index, value) {
			popupBody.find(`[name=${value}]`)
				.parent().removeClass('d-hide')
				.prop("readonly", false);
		});

		//*добовляет класс
		popupBody.addClass(section_class);


		//*добовляет поля информации
		$('.form__hidden').empty();
		for (const key in hidden) {
			$('.form__hidden').append(function () {
				return $(`
					<input type="hidden" name="${key}" value="${hidden[key]}">
				`)
			})
		}

		//*настраеваем обязятельное поле
		//убираем звездачку у всех элиментов и классы tooltiper
		$.each($('.popup .form__field'), function () {
			$(this)
				.removeAttr('data-tooltip')
				.removeClass('tooltiper');
			const attr = $(this).find('input, textarea').attr('placeholder');
			if (attr !== undefined || null) {
				const regexp = /[*]/gi;
				let check = attr.match(regexp);
				if (check) {
					const str = attr.substring(0, attr.length - 1);
					$(this).find('input, textarea').attr('placeholder', str);
				}
			}
		});
		//добовляем звездачку и класс tooltiper
		$.each(required, function (index, value) {
			let el = $('.popup .form__field').find(`[name="${value}"]`)
			let elPlaceholder = el.attr('placeholder').concat('*');

			el
				.attr('placeholder', elPlaceholder)
				.parent().attr('data-tooltip', 'Обязательное поле')
				.addClass('tooltiper');
		});

		//*Выводим поля
		title.text(arrayValuePopup.title);
		subtitle.text(arrayValuePopup.subtitle);
		btn_title.text(arrayValuePopup.btn_title);

		scrollController.disabledScroll();
		popupBody.fadeIn(300);

		//*Передаем значение звездчки инпуту
		$('.simple-rating__items').on('click', function (e) {
			$('[name="star"]').remove();
			let a = $('.simple-rating__item:checked').val();
			// console.log(a);
			$('.form__hidden').append(function () {
				return $(`
					<input type="hidden" name="star" value="${a}">
				`)
			})
		});
	}

	//*закрытия попапа
	function popupClose(event) {
		popupBody.fadeOut();
		$('.form-wrapper').css('margin-left', '4px');
		scrollController.startScroll();
		//*удаляем добавленные классы

		setTimeout(() => popupBody.removeClass().addClass('form-block popup'), 500);
		setTimeout(() => $('.form-wrapper').css('margin-left', '0px'), 500);

	}

	//*вызов функциий кликом
	btnOpenPopup.on('click', popupOpen);
	$('.popup > .overlay').on('click', popupClose);
	btnClose.on('click', popupClose);

});