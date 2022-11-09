//функция, показывающая ошибку при заполнении формы.
const showInputError = (form, input, errorMessage, parameters) => { //передаем функции три параметра: саму форму, поле ввода в ней, сообщение об ошибке
    const errorElement = form.querySelector(`.${input.id}-error`); //внутри функции находим span элемент ошибки в html. Кладем в переменную. 

    input.classList.add(parameters.inputErrorClass); // добавляем класс ошибки полю с ошибкой. 
    errorElement.textContent = errorMessage; // вставляем текст ошибки. 
    errorElement.classList.add(parameters.errorClass); // делаем ошибку видимой. 
  };
  
  // Функция, удаляющая ошибку, если все правильно. 
  const hideInputError = (form, input, parameters) => { //очень похожа на функцию выше, только все в обратном порядке. 
    const errorElement = form.querySelector(`.${input.id}-error`);

    input.classList.remove(parameters.inputErrorClass);
    errorElement.classList.remove(parameters.errorClass);
    errorElement.textContent = '';
  };

  // Функция, которая проверяет валидность поля
const isValid = (form, input,parameters ) => {
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(form, input, input.validationMessage, parameters);
  } else {
    // Если проходит, скроем
    hideInputError(form, input, parameters);
  }
};

//функция проверки валидности полей формы 
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => { // функция some вернет true, если встретит невалидное поле (первое)
  return !input.validity.valid;
  })
};

//функция переключения кнопки 
const toggleButtonState = (inputList, button, parameters) => {
  if (hasInvalidInput(inputList)) { // если поле невалидно, функция вернет true и тогда кнопке дабавится класс блокирующий кнопку
    button.setAttribute("disabled", "");
    button.classList.add(parameters.inactiveButtonClass);
  } else { //если все поля заполнены верно, функция вернет false и кнопка станет активной. 
    button.removeAttribute("disabled", "");
    button.classList.remove(parameters.inactiveButtonClass);
  }
};

// функция, добавляющая обработчик всем полям формы.
const setEventListeners = (form, parameters) => {
  const inputList = Array.from(form.querySelectorAll(parameters.inputSelector)); //создаем массив из всех форм
  const saveButton = form.querySelector(parameters.saveButtonSelector) // создаем переменную для кнопки "сохранить"

  toggleButtonState(inputList, saveButton, parameters);// 1-ый раз деактивируем кнопку при запуске проекта. 

  form.addEventListener('reset', () => { //вешаем слушатель на событие reset, которое сделает кнопку неактивной через 0 сек после сброса данных 
    setTimeout(() => {
      toggleButtonState(inputList, saveButton, parameters);
    }, 0); 
  });

  inputList.forEach(function(input){
    input.addEventListener('input', () => {
      isValid(form, input, parameters)
    });
  });
}

//Функция добавления обработчиков всем форма
const enableValidation = (parameters) => { 
  const formList = Array.from(document.querySelectorAll(parameters.formSelector));
  
  formList.forEach((form) => {
    setEventListeners(form, parameters);
  });
};

enableValidation({ // будем передавать через parameters каждой функции то, что ей нужно будем взять в объекте. 
    formSelector: '.form',
    inputSelector: '.form__input',
    saveButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'input-error_active'
});