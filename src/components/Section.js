export default class Section {
    constructor (selectorContainer) {
        this._container = document.querySelector(selectorContainer);
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }
}