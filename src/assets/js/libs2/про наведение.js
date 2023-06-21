/*
Этот код иллюстрирует то, что при наведении курсора мыши появляется всплывающая подсказка,
при наведении курсора мыши она устанавливает задержку для ее исчезновения.
Если мышь попадает в тот же элемент до срабатывания задержки, то мы уничтожаем триггер до его срабатывания,
используя данные, которые мы сохранили ранее.
*/

$("someelement").mouseenter(function () {
    clearTimeout($(this).data('timeoutId'));
    $(this).find(".tooltip").fadeIn("slow");
}).mouseleave(function () {
    var someElement = $(this),
        timeoutId = setTimeout(function () {
            someElement.find(".tooltip").fadeOut("slow");
        }, 650);
    //set the timeoutId, allowing us to clear this trigger if the mouse comes back over
    someElement.data('timeoutId', timeoutId);
});