import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    constructor(selectorPopup){
        super(selectorPopup);
        this._photo = this._popup.querySelector('.zoom__photo'); 
        this._caption = this._popup.querySelector('.zoom__caption');
    }
    open (src, alt) { 
        this._photo.src = src;
        this._photo.alt = alt;
        this._caption.textContent = alt;
        super.open();
    }
}