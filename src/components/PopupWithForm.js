import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor(selectorPopup, formSubmitCallback) {
        super(selectorPopup);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
        this._button = this._form.querySelector('.form__save-button')
    }

    _getInputValues () {     
        const inputValues = {}
        this._inputList.forEach((input) => {inputValues[input.name] = input.value});
        return inputValues;
    }

    _submitHandler(evt) {
        evt.preventDefault();
        const formValues = this._getInputValues();
        this._formSubmitCallback(formValues, this._button);
    }
    
    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', this._submitHandler.bind(this));
    }

    close() {
        super.close()
        this._form.reset()
    }
}