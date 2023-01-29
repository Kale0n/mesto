export class FormValidator{
    constructor (formObject, formElement) {
        this._inputSelector = formObject.inputSelector;
        this._saveButtonSelector = formObject.saveButtonSelector;
        this._inactiveButtonClass = formObject.inactiveButtonClass;
        this._inputErrorClass = formObject.inputErrorClass;        
        this._form = formElement; 
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector )); //создаем массив из всех форм
        this._saveButton = this._form.querySelector(this._saveButtonSelector) // создаем переменную для кнопки "сохранить"
    }
    
    //функция, показывающая ошибку при заполнении формы.
    _showInputError = (input, errorMessage) => { //передаем функции три параметра: саму форму, поле ввода в ней, сообщение об ошибке
        const errorElement = this._form.querySelector(`.${input.id}-error`); //внутри функции находим span элемент ошибки в html. Кладем в переменную. 
        
        input.classList.add(this._inputErrorClass); // добавляем класс ошибки полю с ошибкой. 
        errorElement.textContent = errorMessage; // вставляем текст ошибки. 
    };
    
    // Функция, удаляющая ошибку, если все правильно. 
    _hideInputError = (input) => { //очень похожа на функцию выше, только все в обратном порядке. 
        const errorElement = this._form.querySelector(`.${input.id}-error`);
        
        input.classList.remove(this._inputErrorClass);
        errorElement.textContent = '';
    };
    
    // Функция, которая проверяет валидность поля
    _toggleInputErrorState = (input) => {
        if (!input.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
           this._showInputError(input, input.validationMessage);
        } else {
            // Если проходит, скроем
           this._hideInputError(input);
        }
    };
    
    //функция проверки валидности полей формы 
    _hasInvalidInput = () => {
        return this._inputList.some((input) => { // функция some вернет true, если встретит невалидное поле (первое)
            return !input.validity.valid;
        })
    };
    
    //публичная функция переключения кнопки 
    toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) { // если поле невалидно, функция вернет true и тогда кнопке дабавится класс блокирующий кнопку
            this._saveButton.setAttribute("disabled", "");
            this._saveButton.classList.add(this._inactiveButtonClass);
        } else { //если все поля заполнены верно, функция вернет false и кнопка станет активной. 
            this._saveButton.removeAttribute("disabled", "");
            this._saveButton.classList.remove(this._inactiveButtonClass);
        }
    }
    
    // функция, добавляющая обработчик всем полям формы.
    _setEventListeners = () => {    
        this.toggleButtonState();// 1-ый раз деактивируем кнопку при запуске проекта. 
        
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleInputErrorState(input)
                this.toggleButtonState(); //сразу же каждому полю вешаем переключатель кнопки 
            });
        });
    }
    
    //Функция добавления обработчика
    enableValidation = () => { 
        this._setEventListeners();
    };
}