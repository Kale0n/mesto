import Popup from './Popup.js'
export default class PopupWithForm extends Popup {
    constructor(selectorPopup, formSubmitCallback) { //функция formSubmitCallback будет принимать объект и сабмитить его. 
        super(selectorPopup);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputList = Array.from(this._popup.querySelectorAll('.form__input'));
    }

    _getInputValues () {     
        const inputValues = {}
        this._inputList.forEach((input) => {inputValues[input.name] = input.value});
        return inputValues;
    }

    _submitHandler(evt) {
        evt.preventDefault();
        const formValues = this._getInputValues();
        this.close();
        this._formSubmitCallback(formValues);
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