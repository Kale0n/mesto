export default class Popup {
    constructor (selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', () => {this.close()});
        document.addEventListener('keydown', (evt) => (this._handleEscClose(evt)))
        this._popup.addEventListener('click', (evt) =>
         {if (evt.target.classList.contains('popup'))
            {this.close()}
        })
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => (this._handleEscClose(evt)))
    }
}