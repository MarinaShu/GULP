

$(".footer__item").on("click", function () {
    $(".footer__item").not(this).removeClass("active").next(".footer__links").slideUp();
    $(this).toggleClass("active").next(".footer__links").slideToggle();
});
$(".faq__item:first-child .footer__item").addClass("active").next(".footer__links").slideToggle();
