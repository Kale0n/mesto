export default class Card { //единый класс создания карточек. Экспортируемый. 
    constructor (data,  templateSelector, handleCardClick) { //конструктор принимает три параметра: объект, селектор шаблона, функцию открытия попапа. 
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._openFunction = handleCardClick;
    }

    _getCardTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true); 
        
        return cardElement
    }

    _handleLikeClick (event) {
        event.target.classList.toggle('element__like-button_active');
    }

    _removeCard() {
        this._card.remove();
    }

    _setEventListeners () {
        this._card.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick); //кнопка лайка
        this._card.querySelector('.element__delete-button').addEventListener('click', (event) => {this._removeCard()}); //кнопка удаления карточки 
        this._card.querySelector('.element__photo-button').addEventListener('click', (event) => {this._openFunction(this._link, this._name)}) //открытие большой картинки нажатием.
    }

    generateCard() {
        this._card = this._getCardTemplate();
        this._cardPhoto = this._card.querySelector('.element__photo');
        this._setEventListeners();

        this._card.querySelector('.element__title').textContent = this._name;
        this._cardPhoto.src = this._link; 
        this._cardPhoto.alt = this._name;
        
        return this._card;
    }
}