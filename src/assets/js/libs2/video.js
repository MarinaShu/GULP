
// btnPopupVideoOpen = $('.btn-play');
btnPopupVideoOpen = $('.ready-model__video_btn');
btnCloseVideo = $('.close-button');

btnPopupVideoOpen.on("click", function () {
    $('.about__video').fadeIn(300);
    wrapperBlurred.addClass(blurred);
    stopScroll();
});

btnCloseVideo.click(function () {
    $('.about__video').fadeOut(300);
    wrapperBlurred.removeClass(blurred);
    startScroll();
    popupIframe = $('.about__video iframe');
    if ($('.about__video').find('iframe').length > 0) {
        popupIframe.each(function () {
            $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        });
    }
});


// закрыть попап Escape
$(document).on('keydown', function (e) {
    if (e.key === 'Escape') {
        btnCloseVideo.click();
        startScroll();
    }
});


// Преобразование ленивой загрузки видео в iframe и доп. настройки улучшения
//Симуляция клика на video по клику на div .play__btn для того, чтобы загрузился iframe
var btn_play_player = $('.play__btn[data-btn]');

btn_play_player.on("click", function () {
    var changeBtn_play_player = $(this).data("btn");
    var iframeid = $('.video[data-id=' + changeBtn_play_player + ']');
    iframeid.trigger('click');
});

var videos = document.querySelectorAll(".about__video .video");
// }
var nb_videos = videos.length;
for (var i = 0; i < nb_videos; i++) {
    // Находим постер для видео, зная ID нашего видео
    // videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/maxresdefault.jpg)';
    videos[i].style.background = 'url(https://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg) center center / 100% auto no-repeat';
    videos[i].style.background = 'url(https://i.ytimg.com/vi/' + videos[i].id + '/maxresdefault.jpg) center center / 100% auto no-repeat';
    videos[i].style.backgroundImage = 'url(../img/bg_video.jpg)';
    //$('.about__video .video').removeAttr('style');


    videos[i].onclick = function () {
        // Создаем iFrame и сразу начинаем проигрывать видео, т.е. атрибут autoplay у видео в значении 1
        var iframe = document.createElement("iframe");
        var iframe_url = "https://www.youtube.com/embed/" + this.id + "?rel=0&autoplay=1&autohide=1&enablejsapi=1";
        var data_id = this.getAttribute("data-id");
        if (this.getAttribute("data-params")) iframe_url += '&' + this.getAttribute("data-params");
        iframe.setAttribute("src", iframe_url);
        iframe.setAttribute("id", data_id);
        iframe.setAttribute("frameborder", '0');
        iframe.setAttribute("allowfullscreen", '');


        iframe.setAttribute('allow', 'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        // Высота и ширина iFrame будет как у элемента-родителя
        iframe.style.width = this.style.width;
        iframe.style.height = this.style.height;
        // Заменяем начальное изображение (постер) на iFrame
        this.parentNode.replaceChild(iframe, this);



        //При нажатии на кнопку плей, видео продолжает воспроизводиться дальше
        var btn_play_player = $('.play__btn[data-btn]');

        btn_play_player.on("click", function () {
            var changeBtn_play_player = $(this).data("btn");
            var iframeid = $('iframe[id=' + changeBtn_play_player + ']');

            iframeid.each(function () {
                $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
            });
        });

        var player;
        $(document).ready(function () {
            onYouTubePlayerAPIReady();
        });

        //Создаем свой плеер, со своими характеристиками
        function onYouTubePlayerAPIReady(event) {
            player = new YT.Player(data_id, {
                events: {
                    'onReady': onReady,
                    'onError': onPlayerError,
                }
            });

        }

        //Привязываем скрипты API YouTube, чтобы наши функции заработали
        var tag = document.createElement('script');
        tag.src = "http://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        //Событие, когда слушается статус видео
        function onReady(event) {
            event.target.setVolume(100);
            event.target.playVideo();
            player.addEventListener('onStateChange', function (e) {

                var statusVideo;
                //Создаем свою переменную и указываем e.data обязательно для прослушивания статуса
                statusVideo = e.data;
                var changeBtn_play_players = event.target.getIframe().id;
                var playId = $('.play__btn[data-btn=' + changeBtn_play_players + ']');

                //Событие, когда видео на паузе
                if (statusVideo == 2) {
                    playId.css({ "opacity": "1", "display": "block" });
                }
                //Событие, когда видео воспроизводится
                else if (statusVideo == 1) {
                    playId.css({ "opacity": "0", "display": "none" });
                }
            });

            //Событие, когда нет связи с Интернетом и показываем ошибку пользователю
            var videoIframeId = event.target.getIframe().id;
            var playId = $('.play__btn[data-btn=' + videoIframeId + ']');
            videoIframe = $('iframe[id=' + videoIframeId + ']');
            blockVideoError = $('.block__video-error[data-i=' + videoIframeId + ']');
            blockVideoErrorIcon = $('.loader-error span');
            if (window.navigator.onLine) { } else {
                playId.css({ "opacity": "0", "display": "none" });
                videoIframe.css("display", "none");
                blockVideoError.addClass('no-network');
                blockVideoError.css("display", "block");
                blockVideoErrorIcon.css("display", "block");
            }
        }

        //Событие, когда URL неверный или видео не доступно. По API это ошибка №5
        function onPlayerError(event) {
            var sError;
            var videoIframeId = event.target.getIframe().id;
            var playId = $('.play__btn[data-btn=' + videoIframeId + ']');
            videoIframe = $('iframe[id=' + videoIframeId + ']');
            blockVideoError = $('.block__video-error[data-i=' + videoIframeId + ']');
            blockVideoErrorIcon = $('.loader-error span');
            sError = player.getPlayerState();
            if (sError == 5) {
                playId.css({ "opacity": "0", "display": "none" });
                videoIframe.css("display", "none");
                blockVideoError.css("display", "block");
                blockVideoErrorIcon.css("display", "block");
            }
        }
    }
}
