//Маска ввода телефона
[].forEach.call(document.querySelectorAll('input[type="tel"]'), function (input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___-__-__",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function (a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5) this.value = ""
    }
    input.addEventListener("input", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);
});
//Разрешено вводить только русс.буквы в ФИО
// $(document).on('input', 'input[name="name"]', function () {
//     this.value = this.value.replace(/[^а-яё\s]/gi, '');
// });

//Каждое слово в ФИО с заглавной буквой
$('input[name="name"]').keyup(function (evt) {
    var txt = $(this).val();
    $(this).val(txt.replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); }));
});


//При клике на инпут телефона, при блюре проверяем значения, что введены все 18 символов
$(document).on('click', 'input[name="phone"]', function () {
    $('input[name="phone"]').on("blur", function () {
        var minlength = $(this).attr('minlength');
        var maxlength = $(this).attr('maxlength');
        if ($(this).val().length >= maxlength && $(this).val().length <= minlength) {
            $('input').removeClass('input_invalid');
        } else {
            $('input').addClass('input_invalid');
        }
    });
});