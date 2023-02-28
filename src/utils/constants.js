//объект формы
const parameters = ({ // будем передавать через parameters каждой функции то, что ей нужно будем взять в объекте. 
    inputSelector: '.form__input',
    saveButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'input-error_active'
});
   
//переменные для кнопок
const buttonEdit = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const buttonAdd = document.querySelector('.profile__add-button');
const buttonAvatarEdit = document.querySelector('.profile__avatar-edit-button')

//переменные для форм
const formEditProfile = document.forms.formEditProfile; 
const formAddCard = document.forms.formAddCard; 
const formAvatarEdit = document.forms.formAvatarEdit;
  
export {parameters, formEditProfile, formAddCard, formAvatarEdit, buttonEdit, buttonAdd, buttonAvatarEdit}