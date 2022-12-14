import {initialCards} from "./initialCards.js"
import { Card } from "./Card.js";
import {FormValidator} from "./FormValidator.js"

//объект формы
const parameters = ({ // будем передавать через parameters каждой функции то, что ей нужно будем взять в объекте. 
  inputSelector: '.form__input',
  saveButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'input-error_active'
});

//массив из форм 
const formList = Array.from(document.querySelectorAll('.form'));


//переменные для карочек
const cardsContainer = document.querySelector('.elements'); 
const cardTemplate = document.querySelector('#card');

//переменные для попапов
const popups = Array.from(document.querySelectorAll('.popup')); //all popups
const page = document.querySelector('.page')
const popupEdit = document.querySelector('.popup_edit'); //ищем в DOMe сам попап
const buttonEdit = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close-button')); //ищем все кнопки "закрыть". Из списка узлов делаем массив
const popupZoom= document.querySelector('.popup_zoom');
const photoZoom = document.querySelector('.zoom__photo');
const photoCaptionZoom = document.querySelector('.zoom__caption');

//переменные для формы редактирования
const formEdit = document.forms.formEdit; 
const nameInput = formEdit.elements.name; //ищем форму по имени "name"
const occupationInput = formEdit.elements.occupation; //ищем инпут с работой
const profileName = document.querySelector('.profile__name'); // переменная, в которой находится имя, укащанное в профиле. 
const profileOccupation = document.querySelector('.profile__occupation'); // по похожей логике создаем переменную с родом занятий

//перемннные для формы создания новой карточки 
const cardFormAdd = document.forms.addForm; 
const placeInput = cardFormAdd.elements.newPlace;
const linkInput = cardFormAdd.elements.link;

// functions
//функция точечного закрытия попапа 
function closePopup (popup) {
 popup.classList.remove('popup_opened');
 document.removeEventListener('keydown', closePopupFromEscape); 
}

// функция закрытия всех попапов. 
function closeAllPopups() {
  popups.forEach(closePopup);
}

//функция закрытия попапа через esc 
function closePopupFromEscape(evt) {
  if (evt.key === 'Escape') {
    closeAllPopups(); // forEach проходится по всем элементам массива и закрывает их, если нажата клавиша esc. ForEach передает коллбэк функции попапы, которая та и принимает как аргумент. 
  } 
}

//функция закрытия попапа через overlay
function closePopupFromOverlay (evt) {
  if (evt.target.classList.contains('popup')) {closeAllPopups()}
}

// функция открытия всех карточек. 
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupFromEscape); //вешаем форму закрытия попапа через esc на весь попап. 
}

// открыть попап с редактированием профиля
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

  closeAllPopups() //вызываем функцию закрытия попапа. 
}

// открытие картинки отдельным попапом
function openPhotoPopup (event){
  openPopup(popupZoom)
  photoZoom.src = event.target.src;
  photoZoom.alt = event.target.alt;

  photoCaptionZoom.textContent = event.target.alt;
}

// Добавление новой карточки через кнопку. 
function handleCardFormSubmit (evt) { //функция обрабатывает инфу из формы добавления карточки и создает новую карточку. 
  evt.preventDefault(evt); 
  cardsContainer.prepend(new Card({name:placeInput.value, link:linkInput.value}, cardTemplate, openPhotoPopup).generateCard())

  cardFormAdd.reset()

  closeAllPopups();
} 

// обработчики и вызов функций
closeButtons.forEach((element) => {element.addEventListener('click', (evt) => {closeAllPopups()})}) // перебираем все кнопки в массиве и на каждую вешаем слушатель, который должен будет закрыть окно 

buttonEdit.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию

formEdit.addEventListener('submit', handleProfileFormSubmit); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 

buttonAdd.addEventListener('click', (evt) => {openPopup(popupAdd)}) // открыть попап с добавлением карточки

cardFormAdd.addEventListener('submit', handleCardFormSubmit);

popups.forEach((element) => {element.addEventListener('click', closePopupFromOverlay)})

initialCards.forEach( item => {
  const card = new Card (item, cardTemplate, openPhotoPopup)
  const cardElement = card.generateCard()

  cardsContainer.append(cardElement)
});
 
formList.forEach((item) => {
    const form = new FormValidator(parameters, item);
    form.enableValidation()
});