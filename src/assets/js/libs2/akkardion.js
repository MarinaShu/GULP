function akkardion() {
    const akkardionFunc = function (wrapperAkkardion, blockAkkardion) {
        wrapperAkkardion.find(blockAkkardion).on('click', function () {
            blockAkkardion.not(this).removeClass('active');
            $(this).addClass('active');
        });
    }
    const wrapperAkkardionFooter = $(".footer__descr");
    const blockAkkardionFooter = $(".akkardion");
    akkardionFunc(wrapperAkkardionFooter, blockAkkardionFooter);

    const wrapperFleet = $(".fleet__container");
    const blockFleet = $(".fleet__item");

    blockFleet.mouseover(function () {
        $(this).trigger("click");
        akkardionFunc(wrapperFleet, blockFleet);
    });
}
	//  akkardion();