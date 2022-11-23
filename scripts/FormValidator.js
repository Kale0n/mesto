export class FormValidator{
    constructor (formObject, formElement) {
        this._inputSelector = formObject.inputSelector;
        this._saveButtonSelector = formObject.saveButtonSelector;
        this._inactiveButtonClass = formObject.inactiveButtonClass;
        this._inputErrorClass = formObject.inputErrorClass;
        this._errorClass = formObject.errorClass;
        
        this._form = formElement; 
    }
    
    //функция, показывающая ошибку при заполнении формы.
    _showInputError = (input, errorMessage) => { //передаем функции три параметра: саму форму, поле ввода в ней, сообщение об ошибке
        const errorElement = this._form.querySelector(`.${input.id}-error`); //внутри функции находим span элемент ошибки в html. Кладем в переменную. 
        
        input.classList.add(this._inputErrorClass); // добавляем класс ошибки полю с ошибкой. 
        errorElement.textContent = errorMessage; // вставляем текст ошибки. 
        errorElement.classList.add(this._errorClass); // делаем ошибку видимой. 
    };
    
    // Функция, удаляющая ошибку, если все правильно. 
    _hideInputError = (input) => { //очень похожа на функцию выше, только все в обратном порядке. 
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        
        input.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };
    
    // Функция, которая проверяет валидность поля
    _isValid = (input) => {
        if (!input.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
           this._showInputError(input, input.validationMessage);
        } else {
            // Если проходит, скроем
           this._hideInputError(input);
        }
    };
    
    //функция проверки валидности полей формы 
    _hasInvalidInput = (inputList) => {
        return inputList.some((input) => { // функция some вернет true, если встретит невалидное поле (первое)
            return !input.validity.valid;
        })
    };
    
    //функция переключения кнопки 
    _toggleButtonState = (inputList, button) => {
        if (this._hasInvalidInput(inputList)) { // если поле невалидно, функция вернет true и тогда кнопке дабавится класс блокирующий кнопку
            button.setAttribute("disabled", "");
            button.classList.add(this._inactiveButtonClass);
        } else { //если все поля заполнены верно, функция вернет false и кнопка станет активной. 
            button.removeAttribute("disabled", "");
            button.classList.remove(this._inactiveButtonClass);
        }
    }
    
    // функция, добавляющая обработчик всем полям формы.
    _setEventListeners = () => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector )); //создаем массив из всех форм
        const saveButton = this._form.querySelector(this._saveButtonSelector) // создаем переменную для кнопки "сохранить"
      
        this._toggleButtonState(inputList, saveButton);// 1-ый раз деактивируем кнопку при запуске проекта. 
        
        this._form.addEventListener('reset', () => { //вешаем слушатель на событие reset, которое сделает кнопку неактивной через 0 сек после сброса данных 
            setTimeout(() => {
               this._toggleButtonState(inputList, saveButton);
            }, 0); 
        });
        
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input)
                this._toggleButtonState(inputList, saveButton); //сразу же каждому полю вешаем переключатель кнопки 
            });
        });
    }
    
    //Функция добавления обрабо
    enableValidation = () => { 
        this._setEventListeners();
    };
}