//общие переменные
const cardTemplate = document.querySelector('#card').content; //ищем шаблон в html
const cardsContainer = document.querySelector('.elements');

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

//общая функция создания карточек
function createCard(cardObject) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardPhoto = card.querySelector('.element__photo');

  card.querySelector('.element__title').textContent = cardObject.name;
  cardPhoto.src = cardObject.link;
  cardPhoto.alt = cardObject.name;
  card.querySelector('.element__like-button').addEventListener('click', (event) => { event.target.classList.toggle('element__like-button_active'); }); //кнопка лайка
  card.querySelector('.element__delete-button').addEventListener('click', (event) => { event.target.closest('.element').remove(); }); //кнопка удаления карточки 
  card.querySelector('.element__photo-button').addEventListener('click', openPhotoPopup) //открытие большой картинки нажатием. 
  return card;
}

// открытие картинки отдельным попапом
function openPhotoPopup (event){
  openPopup(popupZoom)
  photoZoom.src = event.target.src;
  photoZoom.alt = event.target.alt;

  photoCaptionZoom.textContent = event.target.alt;
}

// Добавление новой карточки через кнопку. 
function handleFormSubmit (evt) { //функция обрабатывает инфу из формы добавления карточки и создает новую карточку. 
  evt.preventDefault(evt); 
  cardsContainer.prepend(createCard({name:placeInput.value, link:linkInput.value}))

  cardFormAdd.reset()

  closeAllPopups();
} 

// обработчики и вызов функций
closeButtons.forEach((element) => {element.addEventListener('click', (evt) => {closeAllPopups()})}) // перебираем все кнопки в массиве и на каждую вешаем слушатель, который должен будет закрыть окно 

buttonEdit.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию

formEdit.addEventListener('submit', handleProfileFormSubmit); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 

buttonAdd.addEventListener('click', (evt) => {openPopup(popupAdd)}) // открыть попап с добавлением карточки

cardFormAdd.addEventListener('submit', handleFormSubmit);

popups.forEach((element) => {element.addEventListener('click', closePopupFromOverlay)})

initialCards.forEach( card => cardsContainer.append(createCard(card))); 