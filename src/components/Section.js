export default class Section { 
    constructor (renderer, selectorContainer) { 
        this._renderer = renderer; 
        this._container = document.querySelector(selectorContainer);
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemPrepend(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.forEach(this._renderer); 
    }
}