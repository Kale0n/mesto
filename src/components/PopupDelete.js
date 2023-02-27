import Popup from "./Popup.js"

export default class PopupDelete extends Popup {
    constructor(SelectorPopup,buttonSelector){
        super(SelectorPopup);
        this._button = this._popup.querySelector(buttonSelector)
        this._deleteHandler = this._deleteHandler.bind(this)
        this._deleteCallback = null;
    }

    _deleteHandler() {
        this._deleteCallback();
        this.close();
    }

    open(deleteFunction) {
        super.open();
        this._deleteCallback = deleteFunction;
        this._button.addEventListener('click', this._deleteHandler);
    }

    close() {
        super.close();
        this._button.removeEventListener('click', this._deleteHandler);
    }
}