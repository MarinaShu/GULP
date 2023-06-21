
$('form').submit(function (e) {
    th = $(this);

    if (th.hasClass('popup__form')) {
        sendForm = 1;
    } else {
        sendForm = 0;
    }

    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "check-email.php",
        data: th.serialize(),
        beforeSend: function (xhr) {
            th.find('input[type="submit"]').val('Отправляем...');
        },
        success: function (data, textStatus, xhr, responseText) {
            // console.log(xhr);
            if (xhr.responseText == 'OK') {
                console.log('отправка успешна');
                successDisplay();
            }
            else if (xhr.responseText == 'ERROR') {
                console.log('ошибка загрузки');
                if (sendForm == 1) {
                    errorDisplay();
                } else {
                    errorDisplay();
                }
            }
            if (xhr.responseText == 'SPAM') {
                console.log('отправка SPAM');
                //th.find('input[type="submit"]').css('display', 'none');
                if (sendForm == 0) {
                    localStorage.setItem('SSKGROUPFORM', '2');
                    // $('.feedback__form').find('.feedback__input_btn').addClass('')
                    th.find('.feedback__input_btn').addClass('captcha');
                    $('.captcha-bottom').css('display', 'block');
                    $('.btnFormMain').val('Отправить заявку');
                    $('.captcha-bottom').html('<div class="wrapper-captcha"><div class="captcha-text">Введите код с картинки</div><div class="captcha-info"></div><div class="attempt">Количество попыток: <span class="info-attempt"></span></div><form id="form-captcha" action="captcha/check-captcha.php" method="post"><input name="numberForm" type="hidden" value=""><div class="captcha"><div class="captcha__image-reload"><img class="captcha__image" src="captcha/generation-captcha.php" alt="captcha"><button type="button" class="captcha__refresh" title="Поменять код"></button></div><div class="captcha__group"><label for="captcha"></label><span class="info-code"></span><input type="text" name="captcha" id="captcha" placeholder="Код" required><div class="invalid-feedback"></div></div></div><div class="feedback__input_btn"><button type="submit" class="btn submit">Отправить сообщение</button><span class="feedback__input_descr">Нажимая на кнопку, Вы даете согласие на обработку <a target="_blank" href="#">персональных данных</a></span></div></form></div>');
                    funcCaptcha();
                }
                // blockFormCaptcha.css('display', 'block');
            }
        },
        error: function () {
            console.log('ошибка загрузки на сервер');
            errorDisplay();
        }
    });
});

function returnText() {
    textBtn = popupBtn.data('text');
    popupBtn.val(textBtn);
}

function successDisplay() {
    if (sendForm == 1) {
        popupBody.fadeOut(300);
        getName(checkOk.title, checkOk.subtitle);
        $(".popup-info").fadeIn(300);
        setTimeout(function () {
            $(".popup-info").fadeOut(200);
        }, 2000);
        setTimeout(function () {
            wrapperBlurred.removeClass(blurred);
            startScroll();
            returnText();
        }, 2100);
    } else {
        getNameInfo(checkOk.title, checkOk.subtitle);
        infoDisplayClosePopup();
    }
    // setTimeout(function () {
    //      th.trigger("reset");
    //      localStorage.removeItem('SSKGROUPFORM');
    // }, 1000);
    // yaCounter80347945.reachGoal('call');
}

function errorDisplay() {
    if (sendForm == 1) {
        popupBody.fadeOut(100);
        $('.popup-info').addClass('check-bug');
        getNameInfo(checkError.title, checkError.subtitle);
        $('.popup-info').fadeIn(200);
        setTimeout(function () {
            $(".popup-info").fadeOut(200);
        }, 2000);
        setTimeout(function () {
            returnText();
            popupBody.fadeIn(100);
        }, 2100);
    } else {
        $('.popup-info').addClass('check-bug');
        getNameInfo(checkError.title, checkError.subtitle);
        infoDisplayClosePopup();
    }
    // setTimeout(() => {
    //     localStorage.removeItem('SSKGROUPFORM');
    // }, 500);
}

function infoDisplayClosePopup() {
    wrapperBlurred.addClass(blurred);
    stopScroll();
    $('.popup-info').fadeIn(200);
    setTimeout(function () {
        $(".popup-info").fadeOut(200);
    }, 1200);
    setTimeout(function () {
        $('.btnFormMain').val('Отправить заявку');
        wrapperBlurred.removeClass(blurred);
        startScroll();
        th[0].reset();
    }, 1300);
}