

function funcCaptcha() {
    var numberForm = localStorage.getItem('SSKGROUPFORM');
    $('.wrapper-captcha').find('input[name="numberForm"]').attr('value', numberForm);
    if (localStorage.getItem('SSKGROUPFORM') == '1') {
        var newTh = $('.popup-form');
    }
    else if (localStorage.getItem('SSKGROUPFORM') == '2') {
        var newTh = $('.feedback__form');
    }

    // функция для обновления капчи
    const refreshCaptcha = (target) => {
        const captchaImage = target.closest('.captcha__image-reload').querySelector('.captcha__image');
        captchaImage.src = 'captcha/generation-captcha.php?r=' + new Date().getUTCMilliseconds();
    }
    // получение кнопки для обновления капчи
    const captchaBtn = document.querySelector('.captcha__refresh');
    // запуск функции refreshCaptcha при нажатии на кнопку
    captchaBtn.addEventListener('click', (e) => refreshCaptcha(e.target));

    const form = document.querySelector('#form-captcha');
    var infoAttempt = 3;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            fetch(form.action, {
                method: form.method,
                credentials: 'same-origin',
                body: new FormData(form)
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    document.querySelectorAll('input.is-invalid').forEach((input) => {
                        input.classList.remove('is-invalid');
                        input.nextElementSibling.textContent = '';
                    });

                    if (!data.success) {
                        infoAttempt--;
                        $('.attempt').css('display', 'block');
                        $('.info-attempt').html(infoAttempt);
                        $('input[name="captcha"]').val('');
                        refreshCaptcha(form.querySelector('.captcha__refresh'));
                        data.errors.forEach(error => {

                            console.log(error);
                            const input = form.querySelector(`[name="${error[0]}"]`);
                            if (input) {

                                input.classList.add('is-invalid');
                                input.nextElementSibling.textContent = error[1];

                                if ((input.nextElementSibling.textContent) == 'Вы не прошли проверку') {
                                    console.log('Вы не прошли проверку');
                                    $('.feedback__form').removeClass('captcha');
                                    $(".popup-info").addClass("check-bug");
                                    $(".popup-info").find('.title').html('Попытки закончились');
                                    infoDisplayClosePopup();
                                    // $(".popup").removeClass("active")
                                    // $(".popup-info").addClass("active");
                                    // $(".popup-info").find('.title').html('Попытки закончились');
                                    // $(".popup-info").addClass("check-bug");
                                    $('.wrapper-captcha').remove();
                                    newTh.find('input[type="submit"]').removeAttr('style');
                                    setTimeout(() => {
                                        localStorage.removeItem('SSKGROUPFORM');
                                    }, 500);
                                }
                            }
                        });
                    }

                    if (data.success) { //если успешно, правильно введен код капчи
                        form.reset();
                        form.querySelector('.captcha__refresh').disabled = true;
                        form.querySelector('[type=submit]').disabled = true;
                        $.ajax({
                            type: "POST",
                            url: "send.php",
                            data: newTh.serialize(),
                            success: function (data, textStatus, xhr, responseText) {
                                //console.log(xhr);
                                if (xhr.responseText == 'OK') {
                                    $(".popup").removeClass("active")
                                    $("#popup-success").addClass("active");
                                    $("#popup-success").find('.popup-title').html('Спасибо, что доверились нам!');
                                    $("#popup-success").find('.popup-subtitle').html('Уже совсем скоро мы свяжемся с вами.');
                                    $('.wrapper-captcha').remove();
                                    newTh.find('input[type="submit"]').removeAttr('style');
                                    setTimeout(function () {
                                        // Done Functions
                                        newTh.trigger("reset");
                                        localStorage.removeItem('SSKGROUPFORM');
                                    }, 1000);
                                    //yaCounter71847505.reachGoal('call');

                                }
                                else if (xhr.responseText == 'ERROR') {
                                    $(".popup").removeClass("active")
                                    $("#popup-success").addClass("active");
                                    $("#popup-success").find('.popup-title').html('Ой, что-то пошло не так...');
                                    $("#popup-success").find('.popup-subtitle').html('Ваше сообщение не отправилось. Пожалуйста, повторите ещё раз.');
                                    $('.wrapper-captcha').remove();
                                    newTh.find('input[type="submit"]').removeAttr('style');
                                    setTimeout(() => {
                                        localStorage.removeItem('SSKGROUPFORM');
                                    }, 500);

                                }
                            }
                        });
                    }
                });
        } catch (error) {
            $(".popup").removeClass("active")
            $("#popup-success").addClass("active");
            $("#popup-success").find('.popup-title').html('Ой, что-то пошло не так...');
            $("#popup-success").find('.popup-subtitle').html('Ваше сообщение не отправилось. Пожалуйста, повторите ещё раз.');
            $('.wrapper-captcha').remove();
            newTh.find('input[type="submit"]').removeAttr('style');
            setTimeout(() => {
                localStorage.removeItem('SSKGROUPFORM');
            }, 500);
        }
    });
}
