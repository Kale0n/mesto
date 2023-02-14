//импорты 
import "./index.css"
import {initialCards} from "../utils/initialCards.js";
import {parameters, formEditProfile, formAddCard, buttonEdit, buttonAdd} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

//создание классов
const userInfo = new UserInfo('.profile__name', '.profile__occupation');
const imagePopup = new PopupWithImage('.popup_zoom');
const formEditProfileValidator = new FormValidator(parameters, formEditProfile);
const formAddCardValidator = new FormValidator(parameters, formAddCard);
const editPopup = new PopupWithForm('.popup_edit', userInfo.setUserInfo.bind(userInfo));
const addPopup = new PopupWithForm('.popup_add', handleCardFormSubmit);
const cardsSection = new Section(
  {
    items:initialCards,
    renderer:(item) => {
      const cardElement = createCard(item);
      cardsSection.addItem(cardElement); 
    }
  },
  '.elements'
)

//общая функция создания карточки
function createCard(cardItem) {
  const card = new Card(cardItem, "#card", imagePopup.open.bind(imagePopup))
  const cardElement = card.generateCard()
  return cardElement
}

// функция создания карточки через кнопку добавления в соответсвующей форме
function handleCardFormSubmit ({newPlace, link}) {
  cardsSection.addItemPrepend(createCard({name:newPlace, link:link}));
  formAddCardValidator.toggleButtonState();
} 

//добавляем кнопке "редактировать" слушатель, который по клику на кнопку вызовет функцию
buttonEdit.addEventListener('click', () => {
  const {name, occupation} = userInfo.getUserInfo();
  formEditProfile.name.value = name;
  formEditProfile.occupation.value = occupation;

  editPopup.open();
});

//добавляем кнопке "добавления" слушатель, который по клику на кнопку вызовет функцию
buttonAdd.addEventListener('click', addPopup.open.bind(addPopup))

//создание первоначальных карточек
cardsSection.renderItems();

//добавление обработчиков экземплярам классов
editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

//добавление обработчиков формам 
formEditProfileValidator.enableValidation();
formAddCardValidator.enableValidation();