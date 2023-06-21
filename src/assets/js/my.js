"use strict"
//Динамеческая подстановка картинки
function getIncludeImgUrl() {
	let includeImg = document.querySelectorAll('i.d-hide.src');
	includeImg.forEach(function (el) {
		const text = el.innerText;
		const getImg = el.parentNode.querySelector('img.i');
		getImg.src = text;
		getImg.classList.remove('i');
		el.remove();
	});
}

function getIncludeLinkUrl() {
	let includeLink = document.querySelectorAll('i.d-hide.href');
	includeLink.forEach(function (el) {
		const text = el.innerText;
		const getLink = el.closest('a.i');
		getLink.href = text;
		getLink.classList.remove('i');
		el.remove();
	});
}

function getIncludeClass() {
	let includeClass = document.querySelectorAll('i.class');
	includeClass.forEach(function (el) {
		const text = el.innerText;
		// const getClass = el.closest('a.i, div.i, form.i');
		const parent = el.parentNode;
		const getClass = parent.closest('.i');
		if (text) {
			getClass.classList.add(text);
		}
		getClass.classList.remove('i');
		el.remove();
	});
}

if (document.querySelector('i.src')) { getIncludeImgUrl(); }
if (document.querySelector('i.href')) { getIncludeLinkUrl(); }
if (document.querySelector('i.class')) { getIncludeClass(); }



function addClassForm() {
	const parent = document.querySelector('.form-block');
	const child = parent.querySelector('.phones');
	const childСonsultation = parent.querySelector('.consultation');

	if (childСonsultation) {
		parent.classList.add('form-block-consultation');
	}

	if (child) {
		parent.classList.add('form-block-consultation-phones');

	}
}
if (document.querySelector('.consultation')) { addClassForm(); }


function addClassSilderDoctors() {
	const parent = document.querySelector('.silder-doctors');

	const child = parent.querySelectorAll('.doctors-thumbs__slide');

	if (child.length >= 3) {
		parent.classList.add('childs');
	} else if (child) {
		parent.classList.add('child');
	}
}
if (document.querySelector('.doctors-thumbs__slide')) { addClassSilderDoctors(); }


function checkCookies() {
	let cookieDate = localStorage.getItem('cookieDate');
	let cookieNotification = document.querySelector('.cookie');
	let cookieBtn = cookieNotification.querySelector('.btn');

	// Если записи про кукисы нет или она просрочена на 1 год, то показываем информацию про кукисы
	if (!cookieDate || (+cookieDate + 31536000000) < Date.now()) {
		cookieNotification.classList.add('active');
	}

	// При клике на кнопку, в локальное хранилище записывается текущая дата в системе UNIX
	cookieBtn.addEventListener('click', function () {
		localStorage.setItem('cookieDate', Date.now());
		cookieNotification.classList.remove('active');
	})
}

if (document.querySelector('.cookie')) { checkCookies(); }



