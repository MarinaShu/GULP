$(function () {
	const scrollController = {
		fScrollTop: $('html'),
		disabledScroll() {
			let scrolled = $(window).scrollTop();
			localStorage.setItem('anzheScrollTop', scrolled);
			scrollController.fScrollTop.scrollTop(scrolled);

			let scrollWidth = window.innerWidth - document.documentElement.clientWidth;

			scrollController.fScrollTop.css({
				overflow: "hidden",
				paddingRight: `${-scrollWidth}px`
			});
		},
		startScroll() {
			scrollController.fScrollTop.removeAttr('style');
			localStorage.removeItem('anzheScrollTop');
		}
	}
	//scrollController.startScroll();
	//scrollController.disabledScroll();

	const
		btnOpenPopup = $('.js-popup'),
		popupBody = $('.popup'),
		popupContent = $('.popup__container'),
		response = $('.response'),
		popupTitleInfo = $('.response .title'),
		popupSubTitleInfo = $('.response .subtitle'),
		btnClose = $('.popup .close');
	//ин-фо об отправке
	const checkOk = {
		title: 'Заявка отправлена',
		subtitle: 'Совсем скоро мы свяжемся с вами',
	};
	const checkError = {
		title: 'Что-то пошло не так',
		subtitle: 'Не удалось отправить заявку. Пожалуйста, попробуйте снова',
	};

	function getNameInfo(title, subtitle) {
		popupTitleInfo.html(title);
		popupSubTitleInfo.html(subtitle);
	}

	function sentSuccessfully() {
		getNameInfo(checkOk.title, checkOk.subtitle);
		response.find().removeClass('d-hide');
		$('.img-err').addClass('d-hide');
		response.fadeIn();
	}

	function sentError() {
		getNameInfo(checkError.title, checkError.subtitle);
		response.find().removeClass('d-hide');
		$('.img-ok').addClass('d-hide');
		response.fadeIn();
	}

	//*открытия попапа
	function popupOpen(event) {
		popupBody.fadeIn();
		scrollController.disabledScroll();
	}

	//*закрытия попапа
	function popupClose(event) {
		popupBody.fadeOut();
		setTimeout(function () {
			scrollController.startScroll();
		}, 500);
	}



	//*вызов функциий кликом
	btnOpenPopup.on('click', popupOpen);
	$('.popup > .overlay').on('click', popupClose);
	btnClose.on('click', popupClose);


	$('form').submit(function (e) {
		e.preventDefault();
		const th = $(this);

		var phone_val = $(this).find('input[type=tel]').val();
		var clean_str_phone = phone_val.replace(/[^0-9]/g, '');

		if (+clean_str_phone.length === 11) {
			$(this).find('input[type=tel]').removeClass('invalid');
			$(this).find('button').addClass('loader');
			$.ajax({
				type: "POST",
				url: "/assets/files/smart.php",
				data: $(this).serialize(),
				success: function (data, textStatus, xhr, responseText) {
					console.log(xhr);
					if (xhr.responseText === 'OK') {
						console.log('OK');

						$('.popup .btn').removeClass('loader');
						popupContent.fadeOut();
						sentSuccessfully();
						setTimeout(function () {
							popupClose();
						}, 1500);
						setTimeout(function () {
							response.fadeOut();
							popupContent.fadeIn();
						}, 2000);
					}
					else if (xhr.responseText === 'ERROR') {
						console.log('Error1');

						popupContent.fadeOut();
						sentError();
						setTimeout(function () {
							response.fadeOut();
							$('.popup .btn').removeClass('loader');
							popupContent.fadeIn();
						}, 3000);
					}
				},
				error: function () {
					console.log('Error2');

					popupContent.fadeOut();
					sentError();
					setTimeout(function () {
						$('.popup .btn').removeClass('loader');
						response.fadeOut();
						popupContent.fadeIn();
					}, 3000);
				}
			});

		} else {
			console.log('ошибка нет телефона');
			th.find('input[type=tel]').addClass('invalid');
		}
	});

});