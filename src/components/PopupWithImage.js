import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
    open (src, alt) { 
        document.querySelector('.zoom__photo').src = src;
        document.querySelector('.zoom__photo').alt = alt;
        document.querySelector('.zoom__caption').textContent = alt;
        super.open();
    }
}