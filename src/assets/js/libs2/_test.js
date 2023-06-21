//Валидация формы

// const form = document.querySelector('.feedback__form, .popup input');

// const checkValidity = (input) => {
//     input.classList.remove('input_invalid');
//     input.nextElementSibling.textContent = '';
//     if (!input.checkValidity()) {
//         input.classList.add('input_invalid');
//         input.nextElementSibling.textContent = input.validationMessage;
//     }
// }

// const checkValidityAll = () => {
//     const inputs = form.querySelectorAll('input');
//     inputs.forEach((input) => {
//         checkValidity(input);
//     });
// }

// const onCheckValidity = (e) => {
//     const target = e.target;
//     if (!target.classList.contains('feedback__input')) {
//         return;
//     }
//     checkValidity(target);
// }

// form.addEventListener('change', onCheckValidity);
// form.addEventListener('keydown', onCheckValidity);
// form.addEventListener('keyup', onCheckValidity);
// // checkValidityAll();


// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     checkValidityAll();
// });
