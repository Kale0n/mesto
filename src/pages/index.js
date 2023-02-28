//импорты 
import "./index.css"
import {parameters, formEditProfile, formAddCard, formAvatarEdit, buttonEdit, buttonAdd, buttonAvatarEdit, ownerId} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupDelete from "../components/PopupDelete.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js"

let userId = null;

//создание классов
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'e23e9d74-b9a4-46ab-8ae0-9136da4b8229',
    'Content-Type': 'application/json'
  }
}); 
const userInfo = new UserInfo(
  '.profile__name',
  '.profile__occupation', 
  '.profile__avatar'
);
const imagePopup = new PopupWithImage('.popup_zoom');
const formEditProfileValidator = new FormValidator(parameters, formEditProfile);
const formAddCardValidator = new FormValidator(parameters, formAddCard);
const formAvatarEditValidator = new FormValidator(parameters, formAvatarEdit)
const editPopup = new PopupWithForm(
  '.popup_edit', 
  (data, element) => {
    renderloading(true, element)
    api.editProfile(data)
    .then(
      userInfo.setUserInfo.bind(userInfo)
    ).then(editPopup.close.bind(editPopup)
    ).catch((err) => {
      console.log(err);
  }).finally(
      ()=> renderloading(false, element)
    )
  }
);
const addPopup = new PopupWithForm(
  '.popup_add',
  (data,element) => {
    renderloading(true, element)
    api.addNewCard(data)
    .then(
      handleCardFormSubmit
    ).then(addPopup.close.bind(addPopup)
    ).catch((err) => {
      console.log(err);
  }).finally(
      ()=> renderloading(false, element)
    )
  }
);
const avatarEdit = new PopupWithForm(
  '.popup_avatar-edit',
  (data, element) => {
    renderloading(true, element)
    api.changeAvatar(data)
    .then(
      userInfo.setUserAvatar.bind(userInfo)
    ).then(avatarEdit.close.bind(avatarEdit)
    ).catch((err) => {
      console.log(err);
  }).finally(
      ()=> renderloading(false, element)
    )
  }
);
const deletePopup = new PopupDelete ('.popup_delete', '.popup__button-delete');
const cardsSection = new Section((item) => { 
  const cardElement = createCard(item); 
  cardsSection.addItem(cardElement);  
} , '.elements')

//получение начальных данных (массива карточек и информации о пользователе
Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(([cards, UserData])=> {
  userInfo.setUserInfo(UserData);
  userInfo.setUserAvatar(UserData);
  userId = UserData._id;
  cardsSection.renderItems(cards);
})
.catch((err) => {
  console.log(err);
});

//функции отправки запроса на сервер и получения информации с сервера
function handleDeleteCard (cardId, cardDeleteFunction) {
  deletePopup.open(() => {
    api.deleteCard(cardId).then(() => {
      cardDeleteFunction()
    }).then(deletePopup.close.bind(deletePopup)).catch((err) => {
      console.log(err);
  });
  })
}

function handleLikeCard (cardId) {
  return api.likeCard(cardId).then((data) => {return data.likes.length})
}

function handleDislikeCard (cardId) {
  return api.dislikeCard(cardId).then((data) => {return data.likes.length})
}

//Функция "загрузки"
function renderloading (isLoading, element) {
  if (isLoading) {
    element.textContent = "Сохранение..."
  } else {
    element.textContent = "Сохранить"
  }
}

//общая функция создания карточки
function createCard(cardItem) {
  const card = new Card(
    cardItem,
    "#card",
    userId,
    imagePopup.open.bind(imagePopup),
    handleDeleteCard,
    handleLikeCard,
    handleDislikeCard,
    cardItem.likes.map(owner => owner._id).includes(userId)
  );
  return card.generateCard();
}

// функция создания карточки через кнопку добавления в соответсвующей форме
function handleCardFormSubmit (data) {
  cardsSection.addItemPrepend(createCard(data));
} 

//добавлие слушателей кнопкам
buttonEdit.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  formEditProfile.name.value = name;
  formEditProfile.about.value = about;

  editPopup.open();
});

buttonAdd.addEventListener('click', () => {
  addPopup.open();
  formAddCardValidator.toggleButtonState();
});

buttonAvatarEdit.addEventListener('click', () => {
  avatarEdit.open();
  formAvatarEditValidator.toggleButtonState();
});

//добавление обработчиков экземплярам классов
editPopup.setEventListeners();
addPopup.setEventListeners();
avatarEdit.setEventListeners()
imagePopup.setEventListeners();
deletePopup.setEventListeners();

//добавление обработчиков формам 
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();
formAvatarEditValidator.enableValidation();