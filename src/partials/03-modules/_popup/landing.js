//в зависимости от data-btn="call" в кнопке вызова
//меняется текст попапа
//копируется заголовок блока в скрытое поле

const
    btnOpenPopup = $('.js-popup'),
    popupBody = $('.popup'),
    popupContent = $('.popup__container'),
    response = $('.response'),
    popupTitle = $('.popup .popup__title'),
    popupTitleInfo = $('.response .title'),
    popupSubTitleInfo = $('.response .subtitle'),
    btnClose = $('.popup .close');

let itemDataAttr;
//ин-фо об отправке
const checkOk = {
    title: 'Заявка отправлена',
    subtitle: 'Совсем скоро мы свяжемся с вами',
};
const checkError = {
    title: 'Что-то пошло не так',
    subtitle: 'Не удалось отправить заявку. Пожалуйста, попробуйте снова',
};

const namePopup = {
    call: {
        title: 'Закажите звонок',
        name: 'звонок'
    },
    calculation: {
        title: 'Заявка на расчет',
        name: 'расчет'

    },
}

function preloader(th) {
    th.find('.btn').toggleClass('preloader');
}

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
function popupOpenSent(event) {
    popupBody.fadeIn();
    scrollController.disabledScroll();
}

//*открытия попапа
function popupOpen(event) {
    popupBody.fadeIn();
    scrollController.disabledScroll();

    let dataAttr = $(this).data('btn');

    if (namePopup.hasOwnProperty(dataAttr)) {
        itemDataAttr = namePopup[dataAttr];
        popupTitle.html(itemDataAttr.title);

        $('.popup .form__hidden').append(function () {
            $('.popup .form__hidden').empty();
            return $(`
                    <input type='hidden' name='check' value="goawaybot">
					<input type="hidden" name="title" value="${itemDataAttr.name}">
				`)
        });
    }
    if ($(this).parents('.product__item').find('h3').length > 0) {
        const text = $(this).parents('.product__item').find('h3').text();
        $('[name="title"]').val(text);
    }
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
    const th = $(this);
    preloader(th);
    th.parents().hasClass('popup') ? sendForm = 1 : sendForm = 0;
    e.preventDefault();

    var phone_val = $(this).find('input[type=tel]').val();
    var clean_str_phone = phone_val.replace(/[^0-9]/g, '');

    if (+clean_str_phone.length === 11) {
        $(this).find('input[type=tel]').removeClass('invalid');
        $.ajax({
            type: "POST",
            url: "/assets/files/smart.php",
            data: $(this).serialize(),
            success: function (data, textStatus, xhr, responseText) {
                console.log(xhr);
                if (xhr.responseText === 'OK') {
                    console.log('OK');
                    preloader(th);
                    if (sendForm == 1) {
                        popupContent.fadeOut();
                        sentSuccessfully();
                        setTimeout(function () {
                            popupClose();
                        }, 1500);
                        setTimeout(function () {
                            response.fadeOut();
                            popupContent.fadeIn();
                        }, 2000);
                        // yaCounter93799587.reachGoal('call');
                    } else {
                        console.log('я тут');
                        popupOpenSent();
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
                }
                else if (xhr.responseText === 'ERROR') {
                    console.log('Error1');
                }
            },
            error: function () {
                console.log('Error2');
                preloader(th);
                if (sendForm == 1) {
                    popupContent.fadeOut();
                    sentError();
                    setTimeout(function () {
                        response.fadeOut();
                        popupContent.fadeIn();
                    }, 3000);
                }
            }
        });

    } else {
        console.log('ошибка нет телефона');
        th.find('input[type=tel]').addClass('invalid');
    }
});