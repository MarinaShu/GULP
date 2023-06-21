$(document).on('click', '.select-input span', function () {
    if ($(this).parent().parent().attr('class') == 'sorting') {
        if (!$(this).hasClass('selected')) {
            // preloaderStart();
            attr = $(this).attr('data-for');
            text = $(this).text();
            $('.select-orderby-js').text(text);
            $(this).parent().find('span').removeClass('selected');
            $(this).addClass('selected');
            $('#select option').removeAttr('selected');
            $('#select option[value="' + attr + '"]').prop('selected', true);
            $('#select option[value="' + attr + '"]').attr('selected', 'selected');
            $('#select').trigger('change');
        }
    }
});

$(document).mouseup(function (e) { // событие клика по веб-документу
    var div = $(".quantity-js, .select-method-js, .select-orderby-js, .option-js-active, .quantity-input"); // тут указываем ID элемента
    if (!div.is(e.target) // если клик был не по нашему блоку
        && div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.select-input').removeClass('show');
        $('.select-orderby-js').removeClass('active');
        $('.options-js').removeClass('show');
        $('.option-js-active').removeClass('show');
        div.parents('.quantity').find('.quantity-input').attr('type', 'hidden');
        div.parents('.quantity').find('.quantity-js').css("display", "block");
    }
});

$(document).on('click', '.select-orderby-js', function () {
    $(this).parent().find('.select-input').toggleClass('show');
    $(this).toggleClass('active');
});