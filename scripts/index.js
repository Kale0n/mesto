//variables
//переменные для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardTemplate = document.querySelector('#card').content; //ищем шаблон в html
const cardsContainer = document.querySelector('.elements');

//переменные для попапов
const popupEdit = document.querySelector('.popup_edit'); //ищем в DOMe сам попап
const buttonEdit = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = Array.from(document.querySelectorAll('.popup__close-button')); //ищем все кнопки "закрыть". Из списка узлов делаем массив
const popupZoom= document.querySelector('.popup_zoom');

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
// функция открытия всех карточек. 
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция закрытия всех карточек попапа. 
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function closePopupFromEvent(event) { 
  closePopup(event.target.closest('.popup_opened'))
} 

// открыть попап с редактированием профиля
function editProfile() { //функция, которая добавляет класс к попапу и, тем самым, делает попап видимым. Фокусы на грани магии. 
  openPopup(popupEdit) 
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

// Редактирование информации в профиле. 
function handlSubmitForm (evt) { //функция сохраняет данные и изменяет имя и занятие пользователся
  evt.preventDefault(evt); // предотвращение стандартного события 
  profileName.textContent = nameInput.value; ; //меняем текст второй переменной на значение, полученное первой переменной. 
  profileOccupation.textContent = occupationInput.value; 

  closePopupFromEvent(evt); //вызываем функцию закрытия попапа. 
}

//общая функция создания карточек
function createCard(i) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__title').textContent = initialCards[i].name;
  card.querySelector('.element__photo').src = initialCards[i].link;
  card.querySelector('.element__photo').alt = initialCards[i].name;
  card.querySelector('.element__like-button').addEventListener('click', (event) => { event.target.classList.toggle('element__like-button_active'); }); //кнопка лайка
  card.querySelector('.element__delete-button').addEventListener('click', (event) => { event.target.closest('.element').remove(); }); //кнопка удаления карточки 
  card.querySelector('.element__photo-button').addEventListener('click', openPhotoPopup) //открытие большой картинки нажатием. 
  return card;
}

// открытие картинки отдельным попапом
function openPhotoPopup (event){
  openPopup(popupZoom)
  const photo = document.querySelector('.zoom__photo');
  photo.src = event.target.src;
  photo.alt = event.target.alt;

  const photoCaption = document.querySelector('.zoom__caption');
  photoCaption.textContent = event.target.alt;
}

// Добавление новой карточки через кнопку. 
function addFormSubmit (evt) {
  evt.preventDefault(evt);
  initialCards.unshift({name:placeInput.value, link:linkInput.value}) 
  cardsContainer.prepend(createCard(0))

  cardFormAdd.reset()

  closePopupFromEvent(evt)
} 

// обработчики и вызов функций
buttonsClose.forEach((element) => {element.addEventListener('click', closePopupFromEvent)}) // перебираем все кнопки в массиве и на каждую вешаем слушатель, который должен будет закрыть окно 

buttonEdit.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию

formEdit.addEventListener('submit', handlSubmitForm ); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 

buttonAdd.addEventListener('click', (evt) => {openPopup(popupAdd)}) // открыть попап с добавлением карточки

cardFormAdd.addEventListener('submit', addFormSubmit)

for (let i = 0; i < initialCards.length; i++) {
  cardsContainer.append(createCard(i));
}