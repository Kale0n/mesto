export default class Card { //единый класс создания карточек. Экспортируемый. 
    constructor (data,  templateSelector, userId, handleCardClick, handleDeleteButton, handleLike, handleDislike, isLiked) { //конструктор принимает три параметра: объект, селектор шаблона, функцию открытия попапа. 
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length
        this._templateSelector = templateSelector;
        this._openFunction = handleCardClick;
        this._deleteFunction = handleDeleteButton;
        this._like = handleLike; // Функция, которая принимает айди карточки и возвращает промис с количеством лайков
        this._dislike = handleDislike; // Функция, которая принимает айди карточки и возвращает промис с количеством лайков
        this._userId = userId;
        this._idOwner = data.owner._id;
        this._id = data._id;
        this._isLiked = isLiked;
    }

    _getCardTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true); 
        return cardElement;
    }

    _activateLikeButton() {
        this._isLiked = true;
        this._likeButton.classList.add('element__like-button_active');
    }

    _deactivateLikeButton() {
        this._isLiked = false;
        this._likeButton.classList.remove('element__like-button_active');
    }

    _handleLikeClick (event) {
        if (!event.target.classList.contains('element__like-button_active')) {
            this._like(this._id).then(likesCount => {
                event.target.nextElementSibling.textContent = likesCount;
                this._activateLikeButton();
            }).catch( err => {
                console.log(err);
            })
        } else if (event.target.classList.contains('element__like-button_active')) {
            this._dislike(this._id).then(likesCount => {
                event.target.nextElementSibling.textContent = likesCount;
                this._deactivateLikeButton();
            }).catch( err => {
                console.log(err);
            })
        }
    }

    _removeCard() {
        this._card.remove();
    }

    _setEventListeners () {
        this._likeButton.addEventListener('click', this._handleLikeClick.bind(this));
        this._card.querySelector('.element__delete-button').addEventListener('click', () => {this._deleteFunction(this._id, this._removeCard.bind(this))});
        this._card.querySelector('.element__photo-button').addEventListener('click', (event) => {this._openFunction(this._link, this._name)});
    }

    generateCard() {
        this._card = this._getCardTemplate();
        this._likeButton = this._card.querySelector('.element__like-button');
        this._cardPhoto = this._card.querySelector('.element__photo');
        this._setEventListeners();

        this._card.querySelector('.element__title').textContent = this._name;
        this._cardPhoto.src = this._link; 
        this._cardPhoto.alt = this._name;
        this._card.querySelector('.element__counter').textContent = this._likes;
        if (this._idOwner != this._userId){
            this._card.querySelector(".element__delete-button").remove()
        }
        if (this._isLiked) {
            this._activateLikeButton();
        }
        return this._card;
    }
}