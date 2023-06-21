import replace from "gulp-replace"; //поиск и замена
import browsersync from "browser-sync"; //локальный сервер
import newer from "gulp-newer"; //проверка обновления картинок
import plumber from "gulp-plumber"; //Обработка ошибок
import notify from "gulp-notify"; //сообщение, подсказки
// Экспортируем объект

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	// gulpinclude: gulpinclude,
}