//функция изменения ширины экрана
function checkingMatchMedia(minScreenWidths = 991, trueFuncName, falseFuncName) {
    // const mediaQuery = window.matchMedia('(min-width: 991px)');
    const mediaQuery = window.matchMedia(`(min-width: ${minScreenWidths}px)`);
    function handleTabletChange(e) {
        // Проверить, что media query будет true
        if (e.matches) {
            trueFuncName();
            // //console.log(`функция работае до ${minScreenWidths}`);
        }
        else {
            // //console.log(`мобилка - меньше ${minScreenWidths}`);
            falseFuncName();
        }
    }
    mediaQuery.addListener(handleTabletChange); // Слушать события
    handleTabletChange(mediaQuery); // Начальная проверка
}