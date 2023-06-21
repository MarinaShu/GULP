//Данный код удаляет активный класс у всех соседних элементов
$(this)
    .addClass('active')
    .siblings()
    .removeClass('active');
