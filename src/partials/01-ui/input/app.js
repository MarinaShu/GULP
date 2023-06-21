function maskeinput() {
    $('input[type="tel"]').mask("+7 (999) 999-99-99", {
        autoclear: false
    });

    $(document).on('click', 'input[type=tel]', function () {
        $('input[type=tel]').removeClass('invalid');
        $('input[type=tel]').on("blur", function () {
            var phone_val = $(this).val();
            var clean_str_phone = phone_val.replace(/[^0-9]/g, '');
            if (+clean_str_phone.length === 11) {
                // //console.log('отправка');
                $(this).removeClass('invalid');
            } else {
                // //console.log('ошибка');
                $(this).addClass('invalid');
            }
        });
    });
} maskeinput();

function translationInput() {
    //Скрипт по мгновенному переводу с англ. на русс. язык
    $(document).ready(function () {
        var keyboard_layout = {
            "q": "й", "w": "ц", "e": "у", "r": "к", "t": "е", "y": "н", "u": "г", "i": "ш", "o": "щ", "p": "з", "[": "х", "]": "ъ", "a": "ф", "s": "ы", "d": "в", "f": "а", "g": "п", "h": "р", "j": "о", "k": "л", "l": "д", ";": "ж", "\'": "э", "z": "я", "x": "ч", "c": "с", "v": "м", "b": "и", "n": "т", "m": "ь", ",": "б", ".": "ю", "Q": "Й", "W": "Ц", "E": "У", "R": "К", "T": "Е", "Y": "Н", "U": "Г", "I": "Ш", "O": "Щ", "P": "З", "{": "Х", "}": "Ъ", "A": "Ф", "S": "Ы", "D": "В", "F": "А", "G": "П", "H": "Р", "J": "О", "K": "Л", "L": "Д", ":": "Ж", "\"": "Э", "Z": "Я", "X": "Ч", "C": "С", "V": "М", "B": "И", "N": "Т", "M": "Ь", "<": "Б", ">": "Ю",
        };
        var search_input = $('form input[type=text], form textarea');
        search_input.on('input', function () {
            var val = '';
            var ss = this.selectionStart;
            for (var i = 0; i < this.value.length; i++) {
                if (keyboard_layout[this.value[i]]) {
                    val += keyboard_layout[this.value[i]];
                }
                else {
                    val += this.value[i];
                }
            }
            this.value = val;
            this.selectionStart = ss;
            this.selectionEnd = ss;
        });
    });
} translationInput();
