//переменные для попапов
const editPopup = document.querySelector('.popup_button_edit'); //ищем в DOMe сам попап
const editButton = document.querySelector('.profile__edit-button'); //ищем кнопку "редактировать"
const addPopup = document.querySelector('.popup_button_add');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.popup__close-button')); //ищем все кнопки "закрыть". Из списка узлов делаем массив
const zoomPopup= document.querySelector('.popup_zoom');

//переменные для формы редактирования
const editForm = document.forms.editForm; 
const nameInput = editForm.elements.name; //ищем форму по имени "name"
const occupationInput = editForm.elements.occupation; //ищем инпут с работой
const profileName = document.querySelector('.profile__name'); // переменная, в которой находится имя, укащанное в профиле. 
const profileOccupation = document.querySelector('.profile__occupation'); // по похожей логике создаем переменную с родом занятий

//перемннные для формы создания новой карточки 
const addCardForm = document.forms.addForm; 
const placeInput = addCardForm.elements.newPlace;
const linkInput = addCardForm.elements.link;

//открытие всех карточек. 
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрытие всех карточек попапа. 
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

function closePopupFromEvent(event) { 
  closePopup(event.target.closest('.popup_opened'))
} 

closeButtons.forEach((element) => {element.addEventListener('click', closePopupFromEvent)}) // перебираем все кнопки в массиве и на каждую вешаем слушатель, который должен будет закрыть окно 


// открыть попап с редактированием профиля
function editProfile() { //функция, которая добавляет класс к попапу и, тем самым, делает попап видимым. Фокусы на грани магии. 
  openPopup(editPopup) 
  nameInput.value = profileName.textContent;
  occupationInput.value = profileOccupation.textContent;
}

editButton.addEventListener('click', editProfile); //добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию

// Редактирование информации в профиле. 
function formSubmitHandler (evt) { //функция сохраняет данные и изменяет имя и занятие пользователся
  evt.preventDefault(evt); // предотвращение стандартного события 
  profileName.textContent = nameInput.value; ; //меняем текст второй переменной на значение, полученное первой переменной. 
  profileOccupation.textContent = occupationInput.value; 

  closePopupFromEvent(evt); //вызываем функцию закрытия попапа. 
}

editForm.addEventListener('submit', formSubmitHandler); //эвентлисенер на форму. Лисенер слушаент, не отправлена ли форма, и запускает функцию. 


// открыть попап с добавлением карточки
addButton.addEventListener('click', (evt) => {openPopup(addPopup)})



//работа с шаблоном для карточек. 
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
const cardsContainer = document.querySelector('.elements')


function addCard(card, i) { //общая функция добавления карточек 
  card.querySelector('.element__title').textContent = initialCards[i].name;
  card.querySelector('.element__photo').src = initialCards[i].link;
  card.querySelector('.element__photo').alt = initialCards[i].name;
  card.querySelector('.element__like-button').addEventListener('click', (event) => { event.target.classList.toggle('element__like-button_active'); }); //кнопка лайка
  card.querySelector('.element__delete-button').addEventListener('click', (event) => { event.target.closest('.element').remove(); }); //кнопка удаления карточки 
  card.querySelector('.element__photo-button').addEventListener('click', openPhotoPopup) //открытие большой картинки нажатием. 
}

for (let i = 0; i < initialCards.length; i++) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  addCard(card, i);
  cardsContainer.append(card)
}

// открытие картинки отдельным попапом

function openPhotoPopup (event){
  openPopup(zoomPopup)
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

  const newCard = cardTemplate.querySelector('.element').cloneNode(true)
  addCard(newCard, 0)
  
  cardsContainer.prepend(newCard)

  placeInput.value = '';
  linkInput.value = '';

  closePopupFromEvent(evt)
 } 

addCardForm.addEventListener('submit', addFormSubmit)