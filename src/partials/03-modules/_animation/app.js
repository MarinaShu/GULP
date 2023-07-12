window.onload = function () {
    // // создаем инстанс IntersectionObserver
    const circle = document.querySelectorAll('.circle');
    const parallax = document.querySelector('.animation__block');


    const animationObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const elAnimation = entry.target || {};

                if (!entry.isIntersecting) {
                    console.log('я ушел');
                    elAnimation.classList.remove('show');
                } else {
                    console.log('я здесь');
                    elAnimation.classList.add('show');

                }
            });
        },
        {
            // Трригер сработает при выходе как верхней, так и нижней границы
            threshold: [0, 0.8]
        }
    );

    // Находим все картинки и начинаем их отслеживать
    circle.forEach((item) => {
        animationObserver.observe(item);

        setTimeout(function () {
            window.addEventListener('scroll', function () {
                const valueScroll = window.pageYOffset;
                console.log(valueScroll);
                item.style.cssText = `top: ${valueScroll + 307}px;`;
            });
        }, 1000);
    });
};
