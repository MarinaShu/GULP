function preloader(th) {
    th.find('[type=submit]').toggleClass('preloader');
}


let sendForm = 1;

$('form').submit(function (e) {
    const th = $(this);

    th.parents().hasClass('popup') ? sendForm = 1 : sendForm = 0;

    e.preventDefault();
    preloader(th);


    var phone_val = $(this).find('input[type=tel]').val();
    var clean_str_phone = phone_val.replace(/[^0-9]/g, '');

    if (+clean_str_phone.length === 11) {
        $(this).find('input[type=tel]').removeClass('invalid');
        $(this).find('button[type=submit]').addClass('loader');
        $.ajax({
            type: "POST",
            url: "/assets/files/smart.php",
            data: $(this).serialize(),
            success: function (data, textStatus, xhr, responseText) {
                //console.log(xhr);
                if (xhr.responseText === 'OK') {
                    preloader(th);

                    console.log('OK');
                    sendForm == 1 ? sendingPopup() : sendingMain();
                    // yaCounter93799587.reachGoal('call');
                }
                else if (xhr.responseText === 'ERROR') {
                    console.log('Error1');
                    preloader(th);

                    sendForm == 1 ? sendingPopup() : sendingMain();
                }
            },
            error: function () {
                console.log('Error2');
                preloader(th);

                sendForm == 1 ? sendingPopup() : sendingMain();
            }
        });

    } else {
        //console.log('ошибка нет телефона');
        th.find('input[type=tel]').addClass('invalid');
    }
});
