	// ************************ select ***************** //
	function select() {
		
		$(document).mouseup(function (e) { // событие клика по веб-документу
			var div = $(".sorting .select-css"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам
				$('.select-input').removeClass('show');
				$('.select-css').removeClass('active');
			}
		});

		$(document).on('click', '.sorting .select-css', function () {
			$(this).parent().find('.select-input').toggleClass('show');
			$(this).toggleClass('active');

			if ($('.sorting').parents().hasClass('popup') && $('.select-input').hasClass('show')) {
				$('.popup').on('click', function (event) {

					let selectTitle = event.target.getAttribute('data-for');
					if (selectTitle !== null) {
						let textContent = $(`[data-for="${selectTitle}"]`).text();
						$(this).find('.select-css').text(textContent);
						$(this).find('[name="option_select"]').val(textContent);
						$('.popup .select-css').addClass('color');

					}
				});
			}
		});


		const sortingBlockChanges = () => {
			if ($('.sorting').parent().hasClass('nav-block')) {
				$('.sorting').addClass('grid');
				$('.select-input').addClass('show');
				$('.select-css').addClass('d-hide');
			} else {
				$('.sorting').removeClass('grid');
				$('.select-input').removeClass('show');
				$('.select-css').removeClass('d-hide');
			}
		}

		const addClass = () => {
			$('.filter').addClass('nav-block');
			sortingBlockChanges();
		}

		const removeClass = () => {
			$('.filter').removeClass('nav-block');
			sortingBlockChanges();
		}
		checkingMatchMedia(575, addClass, removeClass);


	}
	select();