export class Card { //единый класс создания карточек. Экспортируемый. 
    constructor (data,  template, openFunction) { //конструктор принимает три параметра: объект, шаблон, фенкцию открытия попапа. 
        this._name = data.name;
        this._link = data.link;
        this._template = template.content;
        this._openFunction = openFunction;
    }

    _getCardTemplate() {// метод, который получает шаблон из разметки. 
        const cardElement = this._template.querySelector('.element').cloneNode(true); 
        
        return cardElement
    }

    _setEventListeners () { // установка слушателей. 
        this._card.querySelector('.element__like-button').addEventListener('click', (event) => { event.target.classList.toggle('element__like-button_active'); }); //кнопка лайка
        this._card.querySelector('.element__delete-button').addEventListener('click', (event) => { event.target.closest('.element').remove(); }); //кнопка удаления карточки 
        this._card.querySelector('.element__photo-button').addEventListener('click', this._openFunction) //открытие большой картинки нажатием.
    }

    generateCard() { //публичный метод, который создает карточку. 
        this._card = this._getCardTemplate();
        this._cardPhoto = this._card.querySelector('.element__photo');
        this._setEventListeners();

        this._card.querySelector('.element__title').textContent = this._name;
        this._cardPhoto.src = this._link; 
        this._cardPhoto.alt = this._name;
        
        return this._card;
    }
}