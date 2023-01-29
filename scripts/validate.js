enableValidation({ // будем передавать через parameters каждой функции то, что ей нужно будем взять в объекте. 
    formSelector: '.form',
    inputSelector: '.form__input',
    saveButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
});