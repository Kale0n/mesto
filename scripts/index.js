import {initialCards} from "./initialCards.js"
import {Card } from "./Card.js";
import {FormValidator} from "./FormValidator.js"

//объект формы
const parameters = ({ // будем передавать через parameters каждой функции то, что ей нужно будем взять в объекте. 
  inputSelector: '.form__input',
  saveButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'input-error_active'
});

//переменные для карочек
const cardsContainer = document.querySelector('.elements'); 

//переменные для попапов
const popups = Array.from(document.querySelectorAll('.popup')); //all popups
const popupEdit = document.querySelector('.popup_edit'); //ищем в DOMe сам попап
const buttonEdit = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close-button')); //ищем все кнопки "закрыть". Из списка узлов делаем массив
const popupZoom= document.querySelector('.popup_zoom');
const photoZoom = document.querySelector('.zoom__photo');
const photoCaptionZoom = document.querySelector('.zoom__caption');

//переменные для формы редактирования
const formEditProfile = document.forms.formEditProfile; 
const nameInput = formEditProfile.elements.name; //ищем форму по имени "name"
const occupationInput = formEditProfile.elements.occupation; //ищем инпут с работой
const profileName = document.querySelector('.profile__name'); // переменная, в которой находится имя, укащанное в профиле. 
const profileOccupation = document.querySelector('.profile__occupation'); // по похожей логике создаем переменную с родом занятий

//перемннные для формы создания новой карточки 
const formAddCard = document.forms.formAddCard; 
const placeInput = formAddCard.elements.newPlace;
const linkInput = formAddCard.elements.link;

// переменные для валидаторов форм
const formEditProfileValidator = new FormValidator(parameters, formEditProfile);
const formAddCardValidator = new FormValidator(parameters, formAddCard);

//функция точечного закрытия попапа 
function closePopup (popup) {
 popup.classList.remove('popup_opened');
 document.removeEventListener('keydown', closePopupFromEscape); 
}

//функция закрытия попапа через esc 
function closePopupFromEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  } 
}

//функция закрытия попапа через overlay
function closePopupFromOverlay (evt) {
  if (evt.target.classList.contains('popup')) {closePopup(evt.target)}
}

// функция открытия всех карточек. 
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupFromEscape); //вешаем форму закрытия попапа через esc на весь попап. 
}

// функция открытия попапа с редактированием профиля
function editProfile() { //функция, которая добавляет класс к попапу и, тем самым, делает попап видимым. Фокусы на грани магии. 
  openPopup(popupEdit) 
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

// Редактирование информации в профиле. 
function handleProfileFormSubmit (evt) { //функция сохраняет данные и изменяет имя и занятие пользователся
  evt.preventDefault(evt); // предотвращение стандартного события 
  profileName.textContent = nameInput.value; ; //меняем текст второй переменной на значение, полученное первой переменной. 
  profileOccupation.textContent = occupationInput.value; 

  closePopup(evt.target.closest('.popup_opened')) //вызываем функцию закрытия попапа. 
}

// открытие картинки отдельным попапом
function openPhotoPopup ({ src, alt }){
  openPopup(popupZoom)
  photoZoom.src = src;
  photoZoom.alt = alt;

  photoCaptionZoom.textContent = alt;
}

//общая функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, "#card", openPhotoPopup)
  const cardElement = card.generateCard()
  return cardElement
}

// Добавление новой карточки через кнопку. 
function handleCardFormSubmit (evt) { //функция обрабатывает инфу из формы добавления карточки и создает новую карточку. 
  evt.preventDefault(evt); 
  cardsContainer.prepend(createCard({name:placeInput.value, link:linkInput.value}))

  formAddCard.reset();
  formAddCardValidator.toggleButtonState(); //делаем кнопку неактивнйо 
  
  closePopup(evt.target.closest('.popup_opened'));
} 

// обработчики и вызовы функций
closeButtons.forEach((element) => {element.addEventListener('click', (evt) => {closePopup(evt.target.closest('.popup_opened')) })}) // перебираем все кнопки в массиве и на каждую вешаем слушатель, который должен будет закрыть окно 

buttonEdit.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию

formEditProfile.addEventListener('submit', handleProfileFormSubmit); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 

buttonAdd.addEventListener('click', (evt) => {openPopup(popupAdd)}) // открыть попап с добавлением карточки

formAddCard.addEventListener('submit', handleCardFormSubmit);

popups.forEach((element) => {element.addEventListener('click', closePopupFromOverlay)})

initialCards.forEach( item => {
  cardsContainer.append(createCard(item))
});

formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();